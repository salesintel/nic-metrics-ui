import * as React from 'react'
import {PropTypes as T} from 'react'
import {Component, property, state} from '../../../lib'

import {StickyContainer, Sticky} from 'react-sticky'

import {Icon} from 'react-fa'



import {DataSet} from '../../../lib/DataSet'

interface MyRow {
	ProjectNO: string
	OverUnder: number
	PctCompleteLabor: number
	PctCompleteCost: number

	Title: string
	Manager: string
	IA: string
	Status: string
	ProjectedRevenue: number
	ProjectedCost: number
	ProjectedProfit: number
	Invoiced: number
	MaterialCost: number
	LaborCost: number
	TotalCost: number
	WorkInProgress: number
	UnPostedRevenue: number
	EarnedProfit: number
}


declare function api(path: string): string
import {titleCase} from '../../../lib'
import * as numeral from 'numeral'
import * as moment from 'moment'




let ds: DataSet<MyRow>
ds = new DataSet<MyRow>(api('/projects/status/insideAssociate'))

var style = require('./Projects.sass')

function money(value) {
	const style:any = {}
	if(value < 0) style.color = 'red'

	return (
		<span>
			<span className='affix'>$ </span><span style={style}>{numeral(value).format('(0,000)')}</span>
		</span>
	)
}


export default class Report extends Component<{}> {
	refresh() {
		ds.refresh(() => this.refreshed())
	}

	@state(-1)
	overUnderSort: number

	toggleOverUnderSort = () => {
		this.overUnderSort = -this.overUnderSort
		ds.reorder('OverUnder', this.overUnderSort)
	}

	render() {
		if(this.isRefreshing)	return <div style={{textAlign: 'center'}}><Icon spin name='spinner'/></div>
		const now = moment()

		return (
			<div className='detail'>
				<StickyContainer>
					<Sticky>
						<span className='detailHeaderRow'>
							<span className={style.ProjectNOHeader}/>
							<span className={style.OverUnderHeader}/>
							<span className={style.InvoicedHeader}/>
							<span className={style.PctCompleteHeader}>% COMPLETE</span>
							<span className={style.ProfitHeader}>PROFIT</span>
							<span className={style.RevenueHeader}>REVENUE</span>
							<span className={style.CostHeader}>COST</span>
							<span className={style.HeaderFill}>.</span>
						</span>
						<div className='detailHeaderRow'>
							<span className={style.ProjectNOHeader}>PROJ NO</span>
							<span className={style.OverUnderHeader + ' sortableHeader'} onClick={this.toggleOverUnderSort}><span style={{color: 'red'}}>(OVER)</span>/UNDER</span>
							<span className={style.InvoicedHeader}>INVOICED</span>
							<span className={style.PctCompleteLaborHeader}>LABOR</span>
							<span className={style.PctCompleteCostHeader}>COST</span>
							<span className={style.ProjectedProfitHeader}>PROJECTED</span>
							<span className={style.EarnedProfitHeader}>EARNED</span>
							<span className={style.ProjectedRevenueHeader}>PROJECTED</span>
							<span className={style.UnPostedRevenueHeader}>UNPOSTED</span>
							<span className={style.ProjectedCostHeader}>PROJECTED</span>
							<span className={style.LaborCostHeader}>LABOR</span>
							<span className={style.MaterialCostHeader}>MATERIAL</span>
							<span className={style.TotalCostHeader}>TOTAL</span>
							<span className={style.WorkInProgressHeader}>IN PROGRESS</span>
							<span className={style.StatusHeader}>STATUS</span>
							<span className={style.ManagerHeader}>MANAGER</span>
							<span className={style.TitleHeader}>TITLE</span>
						</div>
					</Sticky>

					{ds.root.map((row:MyRow, idx) => {
						return <div className='detailRow' key={idx}>
							<span className={style.ProjectNO}>{row.ProjectNO}</span>
							<span className={style.OverUnder}>{money(row.OverUnder)}</span>
							<span className={style.Invoiced}>{money(row.Invoiced)}</span>
							<span className={style.PctCompleteLabor}>{numeral(row.PctCompleteLabor * 100).format('0')} <span className='affix'>%</span></span>
							<span className={style.PctCompleteCost}>{numeral(row.PctCompleteCost * 100).format('0')} <span className='affix'>%</span></span>
							<span className={style.ProjectedProfit}>{money(row.ProjectedProfit)}</span>
							<span className={style.EarnedProfit}>{money(row.EarnedProfit)}</span>
							<span className={style.ProjectedRevenue}>{money(row.ProjectedRevenue)}</span>
							<span className={style.UnPostedRevenue}>{money(row.UnPostedRevenue)}</span>
							<span className={style.ProjectedCost}>{money(row.ProjectedCost)}</span>
							<span className={style.LaborCost}>{money(row.LaborCost)}</span>
							<span className={style.MaterialCost}>{money(row.MaterialCost)}</span>
							<span className={style.TotalCost}>{money(row.TotalCost)}</span>
							<span className={style.WorkInProgress}>{money(row.WorkInProgress)}</span>
							<span className={style.Status}>{titleCase(row.Status)}</span>
							<span className={style.Manager}>{titleCase(row.Manager)}</span>
							<span className={style.Title}>{row.Title}</span>
						</div>
					})}
				</StickyContainer>
			</div>
		)
	}
}


interface SummaryRow {
	Over: number
	Under: number
	Active: number
	Accounting: number
	Assigned: number
	OnHold: number
	Completed: number
}





export class Header extends Component<{}> {

	render() {
		return (
			<span>
				<section className='section-lvl-1'>PROJECTS</section>
				<Summary/>
			</span>
		)
	}
}



const summaryDs = new DataSet<SummaryRow>(api('/projects/status/insideAssociate/summary'))

class Summary extends Component<{}> {
	refresh() {
		summaryDs.refresh(() => this.refreshed())
	}

	render() {
		if(this.isRefreshing)	return null
		const summary: SummaryRow = (summaryDs.root[0] as any)

		return (
			<span>
				<span className='sectionLabel' style={{color: 'red'}}>(OVER) </span>
				<span className='sectionValue'>{money(summary.Over)}</span>

				<span className='sectionLabel'>UNDER </span>
				<span className='sectionValue'>{money(summary.Under)}</span>

				<span className='sectionLabel'>ACTIVE </span>
				<span className='sectionValue'>{summary.Active}</span>

				<span className='sectionLabel'>ACCOUNTING </span>
				<span className='sectionValue'>{summary.Accounting}</span>

				<span className='sectionLabel'>ASSIGNED </span>
				<span className='sectionValue'>{summary.Assigned}</span>

				<span className='sectionLabel'>ON HOLD </span>
				<span className='sectionValue'>{summary.OnHold}</span>

				<span className='sectionLabel'>COMPLETED (ytd) </span>
				<span className='sectionValue'>{summary.Completed}</span>
			</span>
		)
	}
}




