declare module 'jss' {

	export interface Style {
		color?: string
		opacity?: number

		background?: string
		backgroundAttachment?: string
		backgroundBlendMode?: string
		backgroundColor?: string
		backgroundImage?: string
		backgroundPosition?: string
		backgroundfRepeat?: string
	}


	export interface Plugin {
		(rule: Rule): void
	}

	export interface JssOptions {
		generateClassName?: string
	}
	export class Jss {
		constructor(options?: JssOptions)
		create(options?: JssOptions): Jss
		createStyleSheet(rules: Object, options?: StyleSheetOptions): StyleSheet
		createRule(selector: string, style: Object, options?: RuleOptions): Rule
		use(...plugins: Plugin[]): Jss
	}

	export interface ToCssOptions {
		indentationLevel?: number
		selector?: string
	}

	export interface RuleOptions {
		named?: boolean
		sheet?: StyleSheet
	}
	export class Rule {
		constructor(selector: string, style: Object, options?: RuleOptions)
		selector: string
		prop(name: string, value: string|number): Rule|string|number
		applyTo(renderable: Element): Rule
		toJSON(): Object
		toString(options?: ToCssOptions): string
	}

	export interface StyleSheetOptions {
		media?: string
		meta?: string
		named?: boolean
		link?: boolean
		element?: any
	}
	export class StyleSheet {
		options: StyleSheetOptions
		rules: {[selector: string]: Object}
		classes: {[className: string]: string}
		attached: boolean
		deployed: boolean
		linked: boolean

		constructor(rules: {[selector: string]: Object}, options?: StyleSheetOptions)
		attach(): StyleSheet
		detach(): StyleSheet
		addRule(selector: string, style: Object): Rule
		addRules(rules: {[selector: string]: Object}): Rule[]
		getRule(selector: string): Rule
		toString(options?: ToCssOptions)
		createRule(selector: string, style: Object, options?: RuleOptions): Rule
		registerRule(rule: Rule): StyleSheet
		unregisterRule(rule: Rule): StyleSheet
	}

	var jss: Jss
	export default jss
}

declare module 'jss-camel-case' {
	import {Plugin} from 'jss'
	export default function pluginInit(): Plugin
}


declare module 'jss-default-unit' {
	interface Options {
		unit: string
	}
	import {Plugin} from 'jss'
	export default function pluginInit(options?: Options): Plugin
}

declare module 'jss-extend' {
	import {Plugin} from 'jss'
	export default function pluginInit(): Plugin
}

declare module 'jss-isolate' {
	interface Options {
		reset: Object
	}
	import {Plugin} from 'jss'
	export default function pluginInit(options?: Options): Plugin
}
declare module 'jss' {
	export interface JssOptions {
		isolate?: boolean
	}
}


declare module 'jss-nested' {
	import {Plugin} from 'jss'
	export default function pluginInit(): Plugin
}

declare module 'jss-props-sort' {
	import {Plugin} from 'jss'
	export default function pluginInit(): Plugin
}

declare module 'jss-vendor-prefixer' {
	import {Plugin} from 'jss'
	export default function pluginInit(): Plugin
}


