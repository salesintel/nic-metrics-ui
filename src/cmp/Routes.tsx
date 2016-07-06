import * as React from 'react'
import {Component, property, state} from '../lib'

import {
	Router,
	Route,
	IndexRedirect,
	browserHistory
} from 'react-router';



import Shell from './Shell'
import Report from './rpt/InsideAssociate'

export default class Routes extends React.Component<void, void> {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Shell}>
					<IndexRedirect to="/test"/>
					<Route path='report' component={Report}/>
				</Route>
			</Router>
		)
	}
}