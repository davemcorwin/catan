'use strict'

require('babel-register')

var server = require('./server').default

const PORT = process.env.PORT || 3000

server.listen(PORT)
