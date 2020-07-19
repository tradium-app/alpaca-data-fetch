const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({ paper: true })
const { Parser } = require('json2csv')
const fs = require('fs')

require('dotenv').config()

alpaca
	.getBars('5Min', 'AAPL', {
		limit: 500,
	})
	.then((barset) => {
		const aapl_bars = barset['AAPL']

		const parser = new Parser({ fields: ['startEpochTime', 'openPrice', 'highPrice', 'lowPrice', 'closePrice', 'volume'] })

		const csv = parser.parse(aapl_bars)

		fs.writeFile('./data/AAPL.csv', csv, (err) => {
			if (err) return console.log(err)
		})

		console.log('printing barset', csv)
	})
