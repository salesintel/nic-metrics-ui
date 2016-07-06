import {observable, action, asFlat, transaction, IObservableArray} from 'mobx'
import * as request from 'superagent'
import * as moment from 'moment'

export interface Aggregations<TRow> {
	[aggName: string]: (aggregators: Aggregators, row: TRow) => void
}

export interface Aggregators {
	sum(value: string|number): number
	avg(value: string|number): number
	min(value: string|number|Date): string|number|Date
	max(value: string|number|Date): string|number|Date
	count(): number
	distinctCount(value: string|number|Date): number
}


interface Aggregator {
	name: string,
	accum?: any,
	func: (group: GroupRow, row: any) => void
	value?: any
}

class GroupRow {
	@observable
	items: any[] = asFlat([])

	private aggregations: Aggregator[]
	private name: string

	constructor(name: string, value: any, aggregations: Aggregations<any>) {
		this[name] = value
		if(!aggregations) return

		this.aggregations = []
		Object.keys(aggregations).forEach(name => {this.aggregations.push({name, func: aggregations[name]})})
	}

	private currentAggregation: Aggregator
	aggregate(row: any) {
		if(!this.aggregations) return
		this.aggregations.forEach(aggregation => {
			this.currentAggregation = aggregation
			this[aggregation.name] = aggregation.func(this, row)
		})
	}

	sum(value: any) {
		const {currentAggregation} = this
		if(value === null || value === undef) return currentAggregation.value || 0
		value = typeof value === 'string' ?	parseFloat('0' + value) : value
		if(!currentAggregation.value) currentAggregation.value = 0
		return currentAggregation.value += value
	}
	avg(value: any) {
		const {currentAggregation} = this
		if(value === null || value === undef) return currentAggregation.value || 0
		value = typeof value === 'string' ?	parseFloat('0' + value) : value
		if(!currentAggregation.value) {
			currentAggregation.value = value
			currentAggregation.accum = {
				total: value,
				count: 1
			}
		}
		else {
			const {accum} = currentAggregation
			accum.count++
			accum.total += value
			currentAggregation.value = accum.total / accum.count
		}
		return currentAggregation.value
	}
	min(value: any) {
		const {currentAggregation} = this
		if(value === null || value === undef) return currentAggregation.value || 0
		if(!currentAggregation.value) currentAggregation.value = 0
		if(value < currentAggregation.value) currentAggregation.value = value
		return currentAggregation.value
	}
	max(value: any) {
		const {currentAggregation} = this
		if(value === null || value === undef) return currentAggregation.value || 0
		if(!currentAggregation.value) currentAggregation.value = 0
		if(value > currentAggregation.value) currentAggregation.value = value
		return currentAggregation.value
	}
	count() {
		const {currentAggregation} = this
		if(!currentAggregation.value) currentAggregation.value = 1
		else currentAggregation.value++
		return currentAggregation.value
	}
	distinctCount(value: any) {
		const {currentAggregation} = this
		if(value === null || value === undef) return currentAggregation.value || 0
		if(!currentAggregation.accum) {
			currentAggregation.accum = {[value]: true}
			currentAggregation.value = 1
		}
		else if(currentAggregation.accum[value] === undef) {
			currentAggregation.accum[value] = true
			currentAggregation.value++
		}
		return currentAggregation.value
	}

	close() {
		this.aggregations = null
	}
}


const undef = {}['undef']
export class DataSet<TRow> {
	url: string

	private groups: {by: string, previousValue?: any}[] = []
	private sort: {by: string, dir: number}[] = []
	private aggregations: Aggregations<TRow>
	private dates = {}

	@observable
	root: IObservableArray<TRow | GroupRow> = asFlat([]) as IObservableArray<TRow | GroupRow>

	constructor(url: string) {
		this.url = url
	}

	group(by: string) {
		this.groups.push({by})
		this.order(by)
		return this
	}

	order(by: string, dir = 1) {
		this.sort.push({by, dir})
		return this
	}

	date(name: string) {
		this.dates[name] = true
		return this
	}

	aggregate(aggregations: Aggregations<TRow>) {
		this.aggregations = aggregations
		return this
	}

	private loadRows = (rows: TRow[]) => {
		this.root.clear()
		rows.sort((leftRow, rightRow) => {
			let comparison = 0

			this.sort.some(order => {
				const leftValue = leftRow[order.by]
				const rightValue = rightRow[order.by]
				if(leftValue === rightValue) return false
				comparison = leftValue < rightValue ? -order.dir : order.dir
				return true
			})

			return comparison
		})

		const lastLevel = this.groups.length - 1
		const levelRows: GroupRow[] = []

		const dateFields = Object.keys(this.dates)

		rows.forEach(row => {
			dateFields.forEach(dateField => row[dateField] = row[dateField] && moment(row[dateField]))// new Date(row[dateField]))

			for(let groupLevel = 0; groupLevel <= lastLevel; ++groupLevel) {
				const group = this.groups[groupLevel]

				if(group.previousValue !== row[group.by]) {
					if(levelRows[groupLevel]) levelRows[groupLevel].close()
					group.previousValue = row[group.by]
					const levelRow = levelRows[groupLevel] = new GroupRow(group.by, row[group.by], this.aggregations)

					if(groupLevel === 0) this.root.push(levelRow)
					else levelRows[groupLevel - 1].items.push(levelRow)

					if(groupLevel < lastLevel) this.groups[groupLevel + 1].previousValue = undef
				}

				levelRows[groupLevel].aggregate(row)
			}

			const details = lastLevel >= 0 ? levelRows[lastLevel].items : this.root
			details.push(row)
		})
	}

	reorder(by: string, dir = 1) {
		transaction(() => {
			const lastLevel = this.groups.length - 1
			let reorderLevel = lastLevel + 1

			for(let groupLevel = 0; groupLevel <= lastLevel; ++groupLevel) {
				const group = this.groups[groupLevel]
				if(group.by === by) {
					reorderLevel = groupLevel
					break
				}
			}

			const compare = (leftItem, rightItem) => {
				const leftValue = leftItem[by]
				const rightValue = rightItem[by]
				if(leftValue === rightValue) return 0
				return leftValue < rightValue ? -dir : dir
			}

			const sortLevel = (level, items) => {
				if(level === reorderLevel) {
					const sorted = items.sort(compare)
					items.clear()
					sorted.forEach(item => items.push(item))
				}
				else items.forEach((item: GroupRow) => sortLevel(level + 1, item.items))
			}

			sortLevel(0, this.root)

			let x = 1
		})
	}

	@observable
	isRefreshing

	@action
	refresh(refreshedCallback?: () => void) {
		if(this.isRefreshing) return
		this.isRefreshing = true
		request
			.get(this.url)
			//.set('Authorization', btoa('paul:qweQWE1!'))
			.withCredentials()
			.end(action('refresh', (err, res) => {
				res && this.loadRows(res.body)
				this.isRefreshing = false
				refreshedCallback && refreshedCallback()
			}))
	}
}

