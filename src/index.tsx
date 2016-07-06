import * as React from 'react'
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import './ast/index.html';

import './cmp/Application';
const rootEl = document.getElementById('app');
function hotRender() {
	const Application = require('./cmp/Application').Application
	render(<AppContainer><Application/></AppContainer>, rootEl);
}
hotRender()
if((module as any).hot) (module as any).hot.accept('./cmp/Application', hotRender);
