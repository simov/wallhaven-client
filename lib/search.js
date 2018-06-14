
var request = require('request-compose').client
var url = require('./url')
var parse = require('./parse')

var search = (params) =>
  request({url: url('search'), qs: params}).then(({body}) => parse(body))

module.exports = search
