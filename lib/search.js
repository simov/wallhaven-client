
var request = require('request-compose').client
var url = require('./url')
var parse = require('./parse')

var search = (params) =>
  request({url: url('search'), qs: params}).then(({body}) => ({
    total: parse.total(body),
    tags: parse.tags(body),
    pages: parse.pages(body),
    wallpapers: parse.wallpapers(body),
  }))

module.exports = search
