import * as React from 'react'
import {PropTypes as T} from 'react'
import {Component as Reactor, property, state} from '../../../lib'
import * as Bs from 'react-bootstrap'

import {StickyContainer, Sticky} from 'react-sticky'
import Infinite = require('react-infinite')



const Header = ({name}) =>
	<div>Header {name.length}</div>

const Report = () =>
	<div>
		Management Report
		<Header name='test'/>
	</div>
export default Report


