import 'should'
import {DataSet} from '../src/lib/DataSet'

/*
import btoa = require('btoa')
import atob = require('atob')
global.btoa = btoa
global.atob = atob
*/

describe('test', () => {
	interface MyRow {
		OPPORNO: number
		TITLE: string
		IA: string
		CUSTOMER: string
		STATUS: string
		PHASE: string
		VALUE: number
	}

	interface MyAgg {
		TotalValue: number
		MaxValue: number
		Count: number
	}

	let ds: DataSet<MyRow>

	beforeEach(() => {
		ds = new DataSet<MyRow>('http://localhost:3000/opportunities')
			.group('IA')
			.group('CUSTOMERNO')
			.aggregate({
				TotalValue: (agg, row) => agg.sum(row.VALUE),
				MaxValue: (agg, row) => agg.max(row.VALUE),
				Count: agg => agg.count()
			})
			.order('STATUS')
	})

	it('should do something', function(done) {
		ds.refresh(() => {
			ds.reorder('STATUS', -1)
			done()
		})
	})
})




const user = {
	name: 'paul'
}
describe('test', () => {
	it('should pass', function(done) {
		user.should.have.property('name', 'paul')
		done()
	})
})
