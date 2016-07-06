import * as React from 'react'
import {Component, property, state} from '../../../lib'

import {StickyContainer, Sticky} from 'react-sticky'

import {Icon} from 'react-fa'

import {DataSet} from '../../../lib/DataSet'

interface MyRow {
	IA: string

	Vendor: string
	Contact: string

	PurchaseNO: string
	PartNO: string
	Part: string
	ProjectNO: string
	Project: string
	Customer: string
	InvoiceDate: moment.Moment
	Qty: number
	AvgPrice: number
	ExtPrice: number
}

interface MyAgg extends MyRow {
	items: any[]

	Contact: string
}

declare function api(path: string): string
import {titleCase} from '../../../lib'
import * as numeral from 'numeral'
import * as moment from 'moment'


let ds: DataSet<MyRow>
ds = new DataSet<MyRow>(api('/purchases/insideAssociate'))
	.group('Vendor')
	.aggregate({
		Contact: (agg, row) => row.Contact,
	})
	.order('ExtPrice', -1)


function money(value) {
	const style:any = {}
	if(value < 0) style.color = 'red'

	return (
		<span>
			<span className='affix'>$ </span><span style={style}>{numeral(value).format('(0,000)')}</span>
		</span>
	)
}

var s = require('./Purchases.sass')


import Grouping from '../Grouping'

export default class Report extends Component<{}> {
	refresh() {
		ds.refresh(() => this.refreshed())
	}

	render() {
		if(this.isRefreshing)	return <div style={{textAlign: 'center'}}><Icon spin name='spinner'/></div>

		const now = moment()

		return (
			<div className='group-detail-lvl-2'>
				<StickyContainer>
					<Sticky>
						<span className='group-detail-header-row-lvl-2'>
							<span className={s.VendorHeader}>VENDOR</span>
							<span className={s.ContactHeader}>CONTACT</span>
						</span>
					</Sticky>
					{ds.root.map((grp:MyAgg, idx) => {
						return (
							<Grouping
								header={
									<span>
										<span className={s.Vendor}>{grp.Vendor}</span>
										<span className={s.Contact}>{grp.Contact}</span>
									</span>
								}
							  level={2}
							>
								<StickyContainer>
									<div className='detail-lvl-2'>
										<Sticky>
										<span className='detailHeaderRow'>
											<span className={s.PurchaseNOHeader}>PO NO</span>
											<span className={s.PartNOHeader}>PART NO</span>
											<span className={s.PartHeader}>PART</span>
											<span className={s.QtyHeader}>QTY</span>
											<span className={s.ExtPriceHeader}>EXT PRICE</span>
											<span className={s.InvoiceDateHeader}>INVOICE AGE</span>
											<span className={s.ProjectNOHeader}>PROJECT NO</span>
											<span className={s.ProjectHeader}>PROJECT</span>
										</span>
										</Sticky>
										{grp.items.map((pur: MyRow, idx) => {
											return <div key={idx} className='detailRow'>
												<span className={s.PurchaseNO}>{pur.PurchaseNO}</span>
												<span className={s.PartNO}>{pur.PartNO}</span>
												<span className={s.Part} title={pur.Part}>{pur.Part}</span>
												<span className={s.Qty}>{numeral(pur.Qty).format('0,000')}</span>
												<span className={s.ExtPrice}>{money(pur.ExtPrice)}</span>
												<span className={s.InvoiceDate}>{now.diff(pur.InvoiceDate, 'days')} <span className='affix'>days</span></span>
												<span className={s.ProjectNO}>{pur.ProjectNO}</span>
												<span className={s.Project}>{pur.Project}</span>
											</div>
										})}
									</div>
								</StickyContainer>
								<div className='detail-margin-lvl-2'></div>
							</Grouping>
						)
					})}
				</StickyContainer>
			</div>
		)
	}
}


export class Header extends Component<{}> {
	render() {
		return <section className='section-lvl-1'>PURCHASES</section>
	}
}