const { downloadBars } = require('./stock-downloader')

;(async () => {
	await downloadBars('TSLA', '2020-07-16T09:30:00-04:00', 5000)
	console.log('download completed')
})()
