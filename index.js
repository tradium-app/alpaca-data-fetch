const { downloadBars } = require('./stock-downloader')

;(async () => {
	await downloadBars('NFLX', '2015-01-02T09:30:00-04:00', '2020-07-19T09:30:00-04:00', 1000).catch((err) => {
		console.log('printing err', err)
	})
	console.log('download completed')
})()
