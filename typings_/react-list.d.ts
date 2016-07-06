declare module 'react-list' {
	import * as React from 'react'

	interface ReactListProps extends React.Props<ReactList> {
		axis?: 'y'|'z'
		initialIndex?: number
		itemRenderer?: (index: number, key: string) => React.ReactElement<any>
		itemsRenderer?: (items: any[], ref) => React.ReactElement<any>
		itemSizeEstimator?: (index: number, cache: number[]) => number
		itemSizeGetter?: (index: number) => number
		length?: number
		pageSize?: number
		scrollParentGetter?: () => Element
		threshold?: number
		type?: 'simple'|'variable'|'uniform'
		useStaticSize?: boolean
		useTranslate3d?: boolean
	}
	class ReactList extends React.Component<ReactListProps, void> {
		scrollTo(index: number): void
		scrollAround(index: number): void
		getVisibleRange(): number[]
	}
	export = ReactList
}