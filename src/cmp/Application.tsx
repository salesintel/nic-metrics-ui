import * as React from 'react'

//import 'bootstrap/dist/css/bootstrap.css';
//import 'react-select/dist/react-select.css'
//import '../ast/react-sticky.css'

import './Application.sass'
//style.use()

import Routes from './Routes'

import Shell from './Shell'
import Report from './rpt/InsideAssociate'



export class Application extends React.Component<{sheet?},{}> {
	render() {
		return <div className='app'>
			<Shell>
				<Report/>
			</Shell>
		</div>
	}
}




