const Alpaca = require('@alpacahq/alpaca-trade-api')
const fastcsv = require('fast-csv')
const fs = require('fs')
const moment = require('moment-business-days')

require('dotenv').config()
const alpaca = new Alpaca({ paper: false })

async function downloadBars(stock = 'AAPL', from_date = '2020-07-16T09:30:00-04:00', to_date = '2020-07-16T09:30:00-04:00', delaySeconds = 5000) {
	let current_date = moment(from_date)
	let end_date = ''
	let promises = []

	const csvFilePath = `./data/${stock}.csv`
	fs.existsSync(csvFilePath) && fs.unlinkSync(csvFilePath) // temporary: delete file

	while (current_date < moment(to_date)) {
		console.log('downloading for current_date', current_date.format('YYYY-MM-DDTHH:mm:ss-04:00'))

		end_date = moment(current_date).businessAdd(14, 'day')

		await new Promise((resolve) => {
			alpaca
				.getBars('5Min', stock, {
					limit: 1000,
					start: current_date.format('YYYY-MM-DDTHH:mm:ss-04:00'),
					end: end_date.format('YYYY-MM-DDTHH:mm:ss-04:00'),
				})
				.then((barset) => {
					const stock_bars = barset[stock]

					const isNewFile = !fs.existsSync(csvFilePath)
					const ws = fs.createWriteStream(csvFilePath, { flags: 'a' })
					!isNewFile && ws.write('\n')

					const formatOptions = { headers: isNewFile }
					fastcsv.writeToStream(ws, stock_bars, formatOptions)

					resolve()
				})
		})

		await delay(delaySeconds)

		current_date = end_date
	}

	return promises
}

function delay(seconds) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, seconds)
	})
}

module.exports = {
	downloadBars,
}
