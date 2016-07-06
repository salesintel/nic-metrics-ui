import * as React from 'react'

import Grouping from '../Grouping'

import Opportunities, {Header as OpportunitiesHeader} from './Opportunities'
import Receivables, {Header as ReceivablesHeader} from './Receivables'
import Projects, {Header as ProjectsHeader} from './Projects'
import Purchases, {Header as PurchasesHeader} from './Purchases'


export default class Report extends React.Component<{sheet?},{}> {
	render() {
		return (
			<div>
				<Grouping	header={<ReceivablesHeader/>}><Receivables/></Grouping>
				<Grouping	header={<PurchasesHeader/>}><Purchases/></Grouping>
				<Grouping	header={<ProjectsHeader/>}><Projects/></Grouping>
				<Grouping	header={<OpportunitiesHeader/>}><Opportunities/></Grouping>
			</div>
		)
	}
}

