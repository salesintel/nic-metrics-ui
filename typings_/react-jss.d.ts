declare module 'react-jss' {
	import {Component} from 'react'
	import {Jss} from 'jss'

	export default function useSheet(jss: Jss): (styles: Object) => (target: Object) => void
	export default function useSheet(styles: Object): ((target: Object) => void)
	export default function useSheet(jss: Jss): ((component: Component<any, any>, styles: Object) => void)
	export default function useSheet(component: Component<any, any>, styles: Object)
}