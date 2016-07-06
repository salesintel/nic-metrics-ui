declare module 'react-hot-loader' {
	import * as React from 'react';

	interface AppContainerProps {
		component?: React.ReactNode;
	}
	export class AppContainer extends React.Component<AppContainerProps, {}>{}
}