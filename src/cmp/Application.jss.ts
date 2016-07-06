
// setup jss
import jss from 'jss'
import camelCase from 'jss-camel-case'
import defaultUnit from 'jss-default-unit'
import extend from 'jss-extend'
import isolate from 'jss-isolate'
import nested from 'jss-nested'
import prefixer from 'jss-vendor-prefixer'
import propsSort from 'jss-props-sort'

// order matters
jss.use(extend())
jss.use(nested())
jss.use(camelCase())
jss.use(defaultUnit())
jss.use(prefixer())
jss.use(propsSort())
//jss.use(isolate())

import * as React from 'react'

import makeUseSheet from 'react-jss'
const useSheet = <any>makeUseSheet(jss)

function useSheetDecorator(rules: Object, options: Object): any
function useSheetDecorator(rules: Object): any
function useSheetDecorator(target: Object): any
function useSheetDecorator(rules?: Object, options?: Object): any {
	if(rules instanceof React.Component) return useSheet()(rules)
	return useSheet(rules, options)
}


export default useSheetDecorator


// application base styles

export const styles = {
	app: {
		fontFamily: 'Roboto'
	},

	navbar: {
		fontFamily: 'Roboto'
	},


	report: {
		fontSize: 16
	},

	sectionLevel1: {
		fontSize: 20
	},
	group: {

	},
	header: {

	},
	detail: {

	},

	row: {
		whiteSpace: 'nowrap',
		backgroundColor: 'white'
	},



	sectionCell: {

	},
	groupCell: {

	},
	headerCell: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		display: 'inline-block',
	},
	detailCell: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		display: 'inline-block',
	}
}

