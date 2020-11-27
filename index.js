const { downloadBars } = require('./stock-downloader')

;(async () => {
	await downloadBars('SPY', '2020-01-01T00:10:00', '2020-11-22T12:10:00', 1).catch((err) => {
		console.log('printing err', err)
	})
	console.log('download completed')
})()
