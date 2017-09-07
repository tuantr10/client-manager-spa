var express = require('express')
var app = express()

var desktopApp = require('./apps/desktop/module')
var apiApp = require('./apps/api/module')

desktopApp.init(app)
apiApp.init(app)

app.listen(3000, function () {
	console.log('app listening on port 3000!')
})