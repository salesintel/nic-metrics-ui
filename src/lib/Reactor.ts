import * as React from 'react'
import {extendObservable, observable, IObservableValue, Reaction, Lambda} from 'mobx';
import {observer} from 'mobx-react'

interface IObservableProto extends React.ComponentLifecycle<any, any> {
	_updateFromProps: string[]
	_contextProps: {[key: string]: string}
	_componentWillReceiveProps: Function
}

interface IObservableContext {
	_observableContext: {[key: string]: IObservableValue<any>}
	context: {[key: string]: any}
}

const undef = {}['undef']

function ensureUpdateFromProps(proto: Object, name: string, nameInContext = null)
{
	const compProto: IObservableProto = <any>proto
	const clazz: React.ComponentClass<any> = <any>proto.constructor
	if(!compProto._updateFromProps) {
		compProto._updateFromProps = []
		compProto._contextProps = {}
		compProto._componentWillReceiveProps = compProto.componentWillReceiveProps
		compProto.componentWillReceiveProps = function(nextProps: Object) {
			const names = compProto._updateFromProps
			let idx = names.length
			while(idx--) {
				const name = names[idx]
				const nameInContext = compProto._contextProps[name]
				const obsCtx = (<IObservableContext>this)._observableContext
				if(!nameInContext || obsCtx && !obsCtx[nameInContext])
					if(nextProps[name] !== undef) this[name] = nextProps[name]
					else this[name] = clazz.defaultProps && clazz.defaultProps[name]
			}
			if(compProto._componentWillReceiveProps)
				compProto._componentWillReceiveProps.call(this, arguments[0], arguments[1])
		}
	}
	compProto._updateFromProps.push(name)
	if(nameInContext) compProto._contextProps[name] = nameInContext
}

function makeContextObservable(instance: IObservableContext, name: string, nameInContext: string, value?: any) {
	let obsCtx = instance._observableContext
	if(!obsCtx) obsCtx = instance._observableContext = {}
	const obs = obsCtx[nameInContext] = observable(value)
	const ctxVal = instance.context && instance.context[nameInContext]
	const getObs = ctxVal || obs

	Object.defineProperty(instance, name, {
		enumerable: true,
		configurable: true,
		get: ctxVal && !ctxVal.get
			? function() {
			return ctxVal
		}
			: (getObs.get ? function() {return getObs.get()} : function() {return getObs}),
		set: function(value) {return obs.set(value)}
	})
}

export function context(proto: Object, name: string)
export function context(defaultValue: any)
export function context(propType?: React.Requireable<any>, defaultValue?: any, nameInContext?: string)
export function context(propType?: React.Requireable<any>, defaultValue?: any, nameInContext?: string) {
	if(arguments.length === 1) {
		defaultValue = propType as any
		propType = null
	}
	else if(arguments.length === 2 && !(propType instanceof Function)) {
		propType = null
		defaultValue = null
	}

	function decorator(proto: Object, name: string) {
		const clazz: React.ComponentClass<any> = <any>proto.constructor
		if(!clazz.childContextTypes) clazz.childContextTypes = {}
		if(!clazz.contextTypes) clazz.contextTypes = {}
		nameInContext = nameInContext || name
		clazz.childContextTypes[nameInContext] = propType
		clazz.contextTypes[nameInContext] = propType

		if(propType) {
			if(!clazz.propTypes) clazz.propTypes = {}
			clazz.propTypes[name] = propType
			if(defaultValue) {
				if(!clazz.defaultProps) clazz.defaultProps = {}
				clazz.defaultProps[name] = defaultValue
			}
		}

		ensureUpdateFromProps(proto, name, nameInContext)

		Object.defineProperty(proto, name, {
			enumerable: true,
			configurable: true,
			get: function() {
				const obs = this.context[nameInContext]
				if(obs) return obs.get ? obs.get() : obs
				makeContextObservable(this, name, nameInContext, propType ? this.props[name] : defaultValue)
				return this[name]
			},
			set: function(value) {
				makeContextObservable(this, name, nameInContext, (propType ? this.props[name] : defaultValue) || value)
			}
		})

		const provider: React.ChildContextProvider<any> = <any>proto
		if(provider.getChildContext) return
		provider.getChildContext = function() {
			if(!this._observableContext) {
				for(var key in clazz.childContextTypes) var ign = this[key]
				if(!this._observableContext) this._observableContext = {}
			}
			return this._observableContext
		}
	}

	if(propType instanceof Function || arguments.length === 1 || arguments.length === 3) return decorator
	decorator.apply(null, arguments)
}



export function property(proto: Object, name: string)
export function property(propType: React.Requireable<any>, defaultValue?: any)
export function property(propType: React.Requireable<any> = React.PropTypes.string, defaultValue?: any) {
	function decorator(proto: Object, name: string) {
		const clazz: React.ComponentClass<any> = <any>proto.constructor
		if(!clazz.propTypes) clazz.propTypes = {}
		clazz.propTypes[name] = propType || React.PropTypes.string
		if(defaultValue) {
			if(!clazz.defaultProps) clazz.defaultProps = {}
			clazz.defaultProps[name] = defaultValue
		}

		Object.defineProperty(proto, name, {
			enumerable: true,
			configurable: true,
			get: function() {return this.props[name]},
			set: function(value) {throw new Error('Properties cannot be set')}
		})
	}

	if(propType instanceof Function) return decorator
	decorator.apply(null, arguments)
}

function ensureStateObservable(instance: any, name: string, value: any) {
	let state = instance.state
	if(!state) state = instance.state = {}
	extendObservable(state, {[name]: value})

	Object.defineProperty(instance, name, {
		enumerable: true,
		configurable: true,
		get: function() {return state[name]},
		set: function(value) {state[name] = value}
	})

	return state[name]
}

export function state(proto: Object, name: string)
export function state(defaultValue?: any)
export function state(propType?: React.Requireable<any>, defaultValue?: any)
export function state(propType?: React.Requireable<any>, defaultValue?: any) {
	if(arguments.length === 1) {
		defaultValue = propType as any
		propType = null
	}
	else if(arguments.length === 2 && !(propType instanceof Function)) {
		propType = null
		defaultValue = null
	}

	function decorator(proto: Object, name: string) {
		if(propType)
			if(propType instanceof Function) {
				const clazz:React.ComponentClass<any> = <any>proto.constructor
				if(!clazz.propTypes) clazz.propTypes = {}
				clazz.propTypes[name] = propType
				if(defaultValue) {
					if(!clazz.defaultProps) clazz.defaultProps = {}
					clazz.defaultProps[name] = defaultValue
				}
			}

		ensureUpdateFromProps(proto, name)

		Object.defineProperty(proto, name, {
			enumerable: true,
			configurable: true,
			get: function() {return ensureStateObservable(this, name, propType ? this.props[name] : defaultValue)},
			set: function(value) {ensureStateObservable(this, name, value)}
		})
	}

	if(propType instanceof Function || arguments.length === 1) return decorator
	decorator.apply(null, arguments)
}

interface IRefresher<TProps> extends React.ComponentLifecycle<TProps, void> {
	refresh?(): void
	isRefreshing?: boolean
	_isRefreshPending?: boolean
}
@observer
export class Component<TProps> extends React.Component<TProps, any> implements IRefresher<TProps> {
	//@context(React.PropTypes.bool, false)
	@observable
	isRefreshing

	_isRefreshPending = false
	private _derivedRender: () => React.ReactElement<any>

	constructor(props) {
		super(props)
		const self: IRefresher<TProps> = this
		if(!self.refresh) return

		this._derivedRender = this.render
		this.render = Component.prototype.render

		let disposeReaction: Lambda
		const componentWillMount = self.componentWillMount
		self.componentWillMount = function() {
			const reaction = new Reaction('refresh', () => {
				if(self.isRefreshing)
					self._isRefreshPending = true

				else {
					self.isRefreshing = true
					reaction.track(() => self.refresh())
				}
			})
			reaction.schedule()
			disposeReaction = reaction.getDisposer()
			componentWillMount && componentWillMount.call(this)
		}
		const componentWillUnmount = self.componentWillUnmount
		self.componentWillUnmount = function() {
			disposeReaction()
			componentWillUnmount && componentWillUnmount.call(this)
		}
	}

	refreshed() {
		const self: IRefresher<TProps> = this
		if(self._isRefreshPending) {
			self._isRefreshPending = false
			self.refresh()
		}
		else self.isRefreshing = false
	}

	render() {
		return this._derivedRender()
	}
}

