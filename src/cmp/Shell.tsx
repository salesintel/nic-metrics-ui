import * as React from 'react'
import {Component, property, state} from '../lib'
import {observable} from 'mobx'

import {StickyContainer, Sticky} from 'react-sticky';

declare function api(path: string): string

import {titleCase} from '../lib'

import Report from './rpt/InsideAssociate'

let user = observable({firstName: '', lastName: '', name: ''})
import * as req from 'superagent'
req
	.get(api('/user'))
	.end((err, res) => {
		if(err) return
		user.firstName = titleCase(res.body.FirstName)
		user.lastName = titleCase(res.body.LastName)
		user.name = user.firstName
	})

import './Shell.sass'

export default class Shell extends Component<{sheet?: any, children?: any}> {
	render() {
		return (
			<StickyContainer>
				<Sticky>
					<div className='navbar'>
						{<span className='userName'>
							Hi {user.name} :{')'} Here's your NicTrics
						</span>}
					</div>
				</Sticky>
				{this.props.children}
			</StickyContainer>
		)
	}
}

