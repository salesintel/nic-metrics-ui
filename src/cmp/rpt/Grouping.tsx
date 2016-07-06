import * as React from 'react'
import {PropTypes as T} from 'react'
import {Component, property, state} from '../../lib'

import {StickyContainer, Sticky} from 'react-sticky'
import Infinite = require('react-infinite')

import useStyle, {styles as rptStyles} from '../Application.jss'
import * as _ from 'lodash'

import {Icon} from 'react-fa'

export default class Grouping extends Component<{
	header: string|React.ReactElement<any>
	level?: number
}> {
	@state(false)
	isExpanded: boolean

	@property(T.number, 1)
	level: number

	toggleExpanded = () => this.isExpanded = !this.isExpanded

	render() {
		return (
			<div>
				<StickyContainer>
					<Sticky>
						<div className={'group-header-lvl-' + this.level} onClick={this.toggleExpanded}>
							<Icon name={this.isExpanded ? 'chevron-down' : 'chevron-right'} className={'expando-lvl-' + this.level}/>
							{this.props.header}
						</div>
					</Sticky>
					{this.isExpanded && this.props.children}
					<div className={'group-margin-lvl-' + this.level}></div>
				</StickyContainer>
			</div>
		)
	}
}