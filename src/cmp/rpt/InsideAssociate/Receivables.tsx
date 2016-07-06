import * as React from 'react'
import {Component, property, state} from '../../../lib'

import {StickyContainer, Sticky} from 'react-sticky'
import {Icon} from 'react-fa'


import {DataSet} from '../../../lib/DataSet'

interface MyRow {
	IA: string

	Customer: string
	Contact: string
	CustomerPhone: string
	CusBalance: number
	CusHiBalance: number
	CusCreditLimit: number

	CustomerPO: string
	InvoiceNO: string
	InvoiceType: string
	DaysUntilDue: number
	ProjectNO: string
	Project: string
	IsProject: boolean
	Due: string
	DueOrd: number
	InvAmount: number
	PaidAmount: number
	Balance: number
}

interface MyAgg extends MyRow {
	items: any[]

	CustomerPhone: string
	Contact: string
	CusBalance: number
	CusHiBalance: number
	CusCreditLimit: number
}

declare function api(path: string): string
import {titleCase} from '../../../lib'
import * as numeral from 'numeral'
import * as moment from 'moment'


let ds: DataSet<MyRow>
ds = new DataSet<MyRow>(api('/receivables/insideAssociate'))
	.group('Customer')
	.aggregate({
		CustomerPhone: (agg, row) => row.CustomerPhone,
		Contact: (agg, row) => row.Contact,
		CusBalance: (agg, row) => row.CusBalance,
		CusHiBalance: (agg, row) => row.CusHiBalance,
		CusCreditLimit: (agg, row) => row.CusCreditLimit,
	})
	.order('Balance', -1)


function money(value) {
	const style:any = {}
	if(value < 0) style.color = 'red'

	return (
		<span>
			<span className='affix'>$ </span><span style={style}>{numeral(value).format('(0,000)')}</span>
		</span>
	)
}

var s = require('./Receivables.sass')


import Grouping from '../Grouping'

export default class Report extends Component<{}> {
	refresh() {
		ds.refresh(() => this.refreshed())
	}

	render() {
		if(this.isRefreshing)	return <div style={{textAlign: 'center'}}><Icon spin name='spinner'/></div>

		return (
			<div className='group-detail-lvl-2'>
				<StickyContainer>
					<Sticky>
						<span className='group-detail-header-row-lvl-2'>
							<span className={s.CustomerHeader}>CUSTOMER</span>
							<span className={s.ContactHeader}>CONTACT</span>
							<span className={s.CusBalanceHeader}>BALANCE</span>
							<span className={s.CusHiBalanceHeader}>HIGHEST</span>
							<span className={s.CusCreditLimitHeader}>CR LIMIT</span>
						</span>
					</Sticky>
					{ds.root.map((grp:MyAgg, idx) => {
						return (
							<Grouping
								header={
									<span>
										<span className={s.Customer}>{grp.Customer}</span>
										<span className={s.Contact}>{grp.Contact + ' ' + grp.CustomerPhone}</span>
										<span className={s.CusBalance}>{money(grp.CusBalance)}</span>
										<span className={s.CusHiBalance}>{money(grp.CusHiBalance)}</span>
										<span className={s.CusCreditLimit}>{money(grp.CusCreditLimit)}</span>
									</span>
								}
							  level={2}
							>
								<StickyContainer>
									<div className='detail-lvl-2'>
										<Sticky>
										<span className='detailHeaderRow'>
											<span className={s.InvoiceNOHeader}>INVOICE</span>
											<span className={s.CustomerPOHeader}>CUSTOMER PO</span>
											<span className={s.InvAmountHeader}>AMOUNT</span>
											<span className={s.PaidAmountHeader}>PAID</span>
											<span className={s.BalanceHeader}>BALANCE</span>
											<span className={s.DueHeader}>(PAST) DUE</span>
											<span className={s.ProjectNOHeader}>PROJECT NO</span>
											<span className={s.ProjectHeader}>PROJECT</span>
										</span>
										</Sticky>
										{grp.items.map((inv: MyRow, idx) => {
											return <div key={idx} className='detailRow'>
												<span className={s.InvoiceNO}>{inv.InvoiceNO}</span>
												<span className={s.CustomerPO}>{inv.CustomerPO}</span>
												<span className={s.InvAmount}>{money(inv.InvAmount)}</span>
												<span className={s.PaidAmount}>{money(inv.PaidAmount)}</span>
												<span className={s.Balance}>{money(inv.Balance)}</span>
												<span className={s.Due}>{inv.Due}{inv.DaysUntilDue < 0 ? <span className='affix'> days</span> : ''}</span>
												<span className={s.ProjectNO}>{inv.ProjectNO}</span>
												<span className={s.Project}>{inv.Project}</span>
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

/*
 InvoiceType: string
 DaysUntilDue: number
 ProjectNO: string
 IsProject: boolean
 Due: string
 DueOrd: number
 InvAmount: number
 PaidAmount: number
 Balance: number

 */

export class Header extends Component<{}> {
	render() {
		return <section className='section-lvl-1'>RECEIVABLES</section>
	}
}