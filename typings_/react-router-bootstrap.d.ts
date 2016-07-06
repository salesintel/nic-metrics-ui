declare module "react-router-bootstrap" {
	import { Component, Props, ValidationMap } from 'react';

	export interface LinkContainerProps extends Props<LinkContainer> {
		to?: string;
		query?: Object;
		hash?: string;
		state?: Object;
		onClick?: () => void;
		disabled?: boolean;
		children?: any;
	}
	export interface LinkContainerContext extends ValidationMap<any> {
		//history: Object;
	}
	export class LinkContainer extends Component<LinkContainerProps, {}>{
		static contextTypes: LinkContainerContext;
	}


	export interface IndexLinkContainerProps extends LinkContainerProps {
		onlyActiveOnIndex?: boolean;
	}

	export class IndexLinkContainer extends Component<IndexLinkContainerProps, {}> {}
}