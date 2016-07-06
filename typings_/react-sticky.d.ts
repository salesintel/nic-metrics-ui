declare module 'react-sticky' {
	import * as React from 'react'

	interface StickContainerProps extends React.Props<StickyContainer> {
		style?: Object
	}

	export class StickyContainer extends React.Component<StickContainerProps, void> {}

	interface StickyProps extends React.ClassAttributes<Sticky>{
		stickyStyle?: Object
		stickyClassName?: string
		topOffset?: number
		bottomOffset?: number
		className?: string
		style?: Object
		onStickyStateChange?: () => void
		isActive?: boolean
	}

	export class Sticky extends React.Component<StickyProps, void> {}
}
