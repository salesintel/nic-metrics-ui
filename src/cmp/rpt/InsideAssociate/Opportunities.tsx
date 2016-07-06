import * as React from 'react'
import {Component, property, state} from '../../../lib'
import {StickyContainer, Sticky} from 'react-sticky'

import {Icon} from 'react-fa'

declare function api(path: string): string
import {titleCase} from '../../../lib'
import * as numeral from 'numeral'
import * as moment from 'moment'

import {DataSet} from '../../../lib/DataSet'

interface MyRow {
	Entered: moment.Moment
	Closing: moment.Moment
	IA: string
	Status: string
	OpporNO: string
	Phase: string
	Probability: number
	Value: number
	Interest: string
	Comment: string
	Title: string
}


let ds: DataSet<MyRow>
ds = new DataSet<MyRow>(api('/opportunities/insideAssociate'))
	.date('Entered')
	.order('Value', -1)

var style = require('./Opportunities.sass')

export default class Report extends Component<{}> {
	refresh() {
		ds.refresh(() => this.refreshed())
	}

	@state(-1)
	valueSort: number

	toggleValueSort = e => {
		this.valueSort = -this.valueSort;
		ds.reorder('Value', this.valueSort)
	}

	render() {
		if(this.isRefreshing)	return <div style={{textAlign: 'center'}}><Icon spin name='spinner'/></div>
		const now = moment()

		return (
			<div className='detail'>
				<StickyContainer>
					<Sticky>
						<div className='detailHeaderRow' style={{backgroundColor: 'white'}}>
							<span className={style.OpporNOHeader}>OPPOR NO</span>
							<span className={style.ValueHeader} onClick={this.toggleValueSort}>DEAL</span>
							<span className={style.ProbabilityHeader}>PROB</span>
							<span className={style.StatusHeader}>STATUS</span>
							<span className={style.PhaseHeader}>PHASE</span>
							<span className={style.ClosingHeader}>CLOSE IN</span>
							<span className={style.EnteredHeader}>AGE</span>
							<span className={style.TitleHeader}>TITLE</span>
							<span className={style.InterestHeader}>INTEREST</span>
						</div>
					</Sticky>
					{ds.root.map((row:MyRow, idx) => {
						const deal = (
							<span>
								<span className='affix'>$ </span>
								{row.Value < 1000
									? (<span className='affix'>{numeral(row.Value).format('0')}</span>)
									: (<span>{numeral(row.Value / 1000).format('(0,000)')}<span className='affix'> k</span></span>)
								}
							</span>
						)

						return <div className='detailRow' key={idx}>
							<span className={style.OpporNO}>{row.OpporNO}</span>
							<span className={style.Value}>{deal}</span>
							<span className={style.Probability}>{row.Probability} <span className='affix'>%</span></span>
							<span className={style.Status}>{row.Status}</span>
							<span className={style.Phase}>{row.Phase}</span>
							<span className={style.Closing}>{now.diff(row.Closing, 'days')} <span className='affix'>days</span></span>
							<span className={style.Entered}>{now.diff(row.Entered, 'days')} <span className='affix'>days</span></span>
							<span className={style.Title}>{row.Title}</span>
							<span className={style.Interest}>{titleCase(row.Interest)}</span>
							<span className={style.Comment} title={row.Comment}>Comments</span>
						</div>
					})}
				</StickyContainer>
			</div>
		)
	}
}


export class Header extends Component<{}> {
	render() {
		return <section className='section-lvl-1'>OPPORTUNITIES</section>
	}
}







