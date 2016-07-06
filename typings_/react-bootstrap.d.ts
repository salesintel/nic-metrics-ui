declare module 'react-bootstrap' {
	import * as React from 'react';
	import { Component, ReactNode, DOMAttributes, HTMLAttributes } from 'react';
	import EventHandler = __React.EventHandler;
	import SyntheticEvent = __React.SyntheticEvent;

	export interface ElementProps extends HTMLAttributes {
		className?: string;
	}

	export interface BootstrapProps extends ElementProps {
		key?: string|number;
		bsClass?: string;
		bsStyle?: string;
		bsSize?: string;
	}

	export interface AccordionProps extends ElementProps {

	}
	export class Accordion extends Component<AccordionProps, {}> {}

	export interface ButtonProps extends BootstrapProps {
		active?: boolean;
		black?: boolean;
		componentClass?: string;
		disabled?: boolean;
		href?: string;
		navDropDown?: boolean;
		navItem?: boolean;
		target?: string;
		type?: string;
		onClick?: any;//() => void;
	}
	export class Button extends Component<ButtonProps, {}> {}

	export interface CheckboxProps extends BootstrapProps {
		checked?: boolean
		readOnly?: boolean
		inline?: boolean
	}
	export class Checkbox extends Component<ButtonProps, {}> {}

	export interface ColProps extends ElementProps {
		key?: string|number;
		componentClass?: string;
		lg?: number;
		lgOffset?: number;
		lgPull?: number;
		lgPush?: number;
		md?: number;
		mdOffset?: number;
		mdPull?: number;
		mdPush?: number;
		sm?: number;
		smOffset?: number;
		smPull?: number;
		smPush?: number;
		xs?: number;
		xsOffset?: number;
		xsPull?: number;
		xsPush?: number;
	}
	export class Col extends Component<ColProps, {}> {}

	interface ControlLabelProps extends BootstrapProps {
		htmlFor?: string
		srOnly?: boolean
	}
	export class ControlLabel extends Component<ControlLabelProps, {}> {}

	export interface DropdownProps {
		dropup?: boolean;
		id?: string|number;
		componentClass?: string;
		disabled?: boolean;
		pullRight?: boolean;
		open?: boolean;
		onClose?: () => void;
		onToggle?: (isOpen: boolean) => void;
		onSelect?: (event: Object, eventKey: any) => void;
	}
	export class Dropdown extends Component<DropdownProps, {}> {}


	export interface DropdownButtonProps {
		dropup?: boolean;
		id?: string|number;
		componentClass?: string;
		disabled?: boolean;
		noCaret?: boolean;
		pullRight?: boolean;
		open?: boolean;
		onClose?: () => void;
		onToggle?: (isOpen: boolean) => void;
		onSelect?: (event: Object, eventKey: any) => void;
		title: ReactNode;
	}
	export class DropdownButton extends Component<DropdownButtonProps, {}> {}


	interface FormProps extends BootstrapProps {
		componentClass?: any
		horizontal?: boolean
		inline?: boolean
	}
	export class Form extends Component<FormProps, {}> {}

	interface FormControlStaticProps extends BootstrapProps {
		label?: string;
		labelClassName?: string;
		wrapperClassName?: string;
	}
	class FormControlStatic extends Component<FormControlStaticProps, {}> {}

	interface FormControlFeedbackProps extends BootstrapProps {}
	class FormControlFeedback extends Component<FormControlFeedbackProps, {}> {}

	interface FormControlProps extends BootstrapProps {
		componentClass?: any
		type?: string
		placeholder?: string
		value?: any
	}
	export class FormControl extends Component<FormControlProps, {}> {
		static Static: FormControlStatic
		static Feedback: FormControlFeedback
	}


	interface FormGroupProps extends BootstrapProps {
		controlId?: string
		validationState?: 'success' | 'warning' | 'error'
	}
	export class FormGroup extends Component<FormGroupProps, {}> {}



	export interface GridProps extends ElementProps {
		key?: string|number;
		componentClass?: string;
		fluid?: boolean;
	}
	export class Grid extends Component<GridProps, {}> {}


	export interface GlyphiconProps extends BootstrapProps {
		glyph: string;
	}
	export class Glyphicon extends Component<GlyphiconProps, {}>{}

	interface HelpBlockProps extends BootstrapProps {}
	export class HelpBlock extends Component<HelpBlockProps, {}> {}

	interface InputGroupAddonProps extends BootstrapProps {}
	class InputGroupAddon extends Component<InputGroupAddonProps, {}> {}
	interface InputGroupButtonProps extends BootstrapProps {}
	class InputGroupButton extends Component<InputGroupButtonProps, {}> {}

	interface InputGroupProps extends BootstrapProps {}
	class InputGroup extends Component<InputGroupProps, {}> {
		static Addon: InputGroupAddon
		static Button: InputGroupButton
	}

	export interface InputBaseProps extends BootstrapProps {
		//label?: ReactNode;
		help?: ReactNode;
		addonBefore?: ReactNode;
		addonAfter?: ReactNode;
		buttonBefore?: ReactNode;
		buttonAfter?: ReactNode;
		hasFeedback?: boolean;
		feedbackIcon?: ReactNode;
		groupClassName?: string;
		wrapperClassName?: string;
		labelClassName?: string;
		multiple?: boolean;
		disabled?: boolean;
		value?: any
	}
	export class Input extends Component<InputBaseProps, {}>{
		getInputDOMNode(): HTMLInputElement;
	}

	export interface MenuItemProps extends BootstrapProps {
		active?: boolean;
		disabled?: boolean;
		divider?: boolean;
		eventKey?: number|string;
		header?: boolean;
		href?: string;
		onSelect?: (eventKey?: any) => void;
		title?: string;
	}
	export class MenuItem extends Component<MenuItemProps, {}> {}

	export interface ModalProps extends BootstrapProps {
		animation?: boolean;
		autoFocus?: boolean;
		backdrop?: boolean | string;
		dialogClassName?: string;
		dialogComponent?: React.ReactNode;
		enforceFocus?: boolean;
		keyboard?: boolean;
		onHide: () => void;
		show?: boolean;
	}
	export class Modal extends Component<ModalProps, {}> {
		static Header: new () => ModalHeader;
		static Title: new () => ModalTitle;
		static Body: new () => ModalBody;
		static Footer: new () => ModalFooter;
	}

	export interface ModalBodyProps extends BootstrapProps {
		modalClassName?: string;
	}
	export class ModalBody extends Component<ModalBodyProps, {}>{}

	export interface ModalHeaderProps extends BootstrapProps {
		'aria-label'?: string;
		closeButton?: boolean;
		modalClassName?: string;
		onHide?: () => void;
	}
	export class ModalHeader extends Component<ModalHeaderProps, {}> {}

	export interface ModalFooterProps extends BootstrapProps {
		modalClassName?: string;
	}
	export class ModalFooter extends Component<ModalFooterProps, {}> {}

	export interface ModalTitleProps extends BootstrapProps {
		modalClassName?: string;
	}
	export class ModalTitle extends Component<ModalTitleProps, {}> {}

	export interface NavProps extends BootstrapProps {
		activeHref?: string;
		activeKey?: any;
		className?: string;
		collapsible?: boolean;
		eventKey?: any;
		expanded?: boolean;
		justified?: boolean;
		navbar?: boolean;
		onSelect?: () => void;
		pullRight?: boolean;
		right?: boolean;
		stacked?: boolean;
		ulClassName?: string;
		ulId?: string;
	}
	export class Nav extends Component<NavProps, {}> {}

	export interface NavbarProps extends BootstrapProps {
		componentClass?: string;
		defaultNavExpanded?: string;
		fixedBottom?: boolean;
		fixedTop?: boolean;
		fluid?: boolean;
		inverse?: boolean;
		navExpanded?: boolean;
		onToggle?: () => void;
		role?: string;
		staticTop?: boolean;
		toggleButton?: any;
		toggleNavKey?: string|number;
	}
	export class Navbar extends Component<NavbarProps, {}> {
		static Brand: new () => NavbarBrand;
		static Header: new () => NavbarHeader;
		//static Toggle: new () => NavbarToggle;
		//static Collapse: new () => NavbarCollapse;
		//static Form: any;
		//static Text: any;
		//static Line: any;
	}

	interface NavbarBrandProps extends BootstrapProps {
	}
	class NavbarBrand extends Component<NavbarBrandProps, void>{}

	interface NavbarHeaderProps extends BootstrapProps {
	}
	class NavbarHeader extends Component<NavbarHeaderProps, void>{}


	export interface NavBrandProps extends BootstrapProps {
		bsRole?: string;
	}
	export class NavBrand extends Component<NavBrandProps, {}> {}

	export interface NavDropdownProps extends DropdownButtonProps {
		eventKey?: any;
	}
	export class NavDropdown extends Component<NavDropdownProps, {}> {}

	export interface NavItemProps extends BootstrapProps {
		active?: boolean;
		disabled?: boolean;
		eventKey?: any;
		href?: string;
		linkId?: string;
		onSelect?: () => void;
		role?: string;
		target?: string;
		title?: any;
		undefined?: string;
	}
	export class NavItem extends Component<NavItemProps, {}> {}

	export interface PanelProps extends ElementProps {
		collapsible?: boolean;
		defaultExpanded?: boolean;
		eventKey?: any;
		expanded?: boolean;
		footer?: React.ReactNode;
		header?: React.ReactNode;
		onSelect?: (eventKey: any) => void;
		panelRole?: string;
	}
	export class Panel extends Component<PanelProps, {}> {}

	export interface PanelGroupProps extends ElementProps {
		accordion?: boolean;
		activeKey?: any;
		defaultActiveKey?: any;
		onSelect?: (activeKey: any) => void;
	}
	export class PanelGroup extends Component<PanelGroupProps, {}> {}

	export interface RowProps extends ElementProps {
		key?: string|number;
		componentClass?: string;
	}
	export class Row extends Component<RowProps, {}> {}

	export interface TableProps extends BootstrapProps {
		bordered?: boolean;
		condensed?: boolean;
		hover?: boolean;
		responsive?: boolean;
		striped?: boolean;
	}
	export class Table extends Component<TableProps, {}> {}

  export interface TabProps extends BootstrapProps {
	  animation?: boolean | any
	  'aria-labelledby'?: string
	  disabled?: boolean
	  eventKey?: any
	  id?: string
	  onEnter?: Function
	  onEntered?: Function
	  onEntering?: Function
	  onExit?: Function
	  onExited?: Function
	  tabClassName?: string
	  title?: any
	  unmountOnExit?: boolean
  }
  export class Tab extends Component<TabProps, void> {
    static Container: TabContainer;
    static Content: TabContent;
    static Pane: TabPane;
  }

  export interface TabContainerProps extends BootstrapProps {
    activeKey?: any;
    generateChildId?: (eventKey: any, type: 'tab' | 'pane') => number;
    id?: string;
    onSelect?: () => void;
  }
  export class TabContainer extends Component<TabContainerProps, void>{}

  export interface TabContentProps extends BootstrapProps {
    animation?: boolean | React.ComponentClass<any>;
    bsClass?: string;
    componentClass?: React.ComponentClass<any>;
    unmountOnExit?: boolean;
  }
  export class TabContent extends Component<TabContentProps, void>{}

  export interface TabPaneProps extends BootstrapProps {
    animation?: boolean | React.ComponentClass<any>;
    'aria-labelledby'?: string;
    bsClass?: string;
    eventKey?: any;
    id?: string;
    onEnter?: () => void;
    onEntered?: () => void;
    onEntering?: () => void;
    onExit?: () => void;
    onExited?: () => void;
    onExiting?: () => void;
  }
  export class TabPane extends Component<TabPaneProps, void>{}

	export interface TabsProps extends BootstrapProps {
		defaultActiveKey?: any
		activeKey?: any
		animation?: boolean
		id?: any
		onSelect?: React.EventHandler<React.SyntheticEvent>
		unmountOnExit?: boolean
	}
	export class Tabs extends Component<TabsProps, void>{}
}