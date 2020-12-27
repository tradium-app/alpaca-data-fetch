const { downloadBars } = require('./stock-downloader')

;(async () => {
	await downloadBars('USO', '2020-01-01T00:10:00', '2020-12-25T12:10:00', 1, (timeframe = '1D')).catch((err) => {
		console.log('printing err', err)
	})
	console.log('download completed')
})()
