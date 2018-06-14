
var fs = require('fs')
var path = require('path')
var https = require('https')
var request = require('request-compose').stream
var url = require('./url')


var get = ({id, ext, size, location, agent}) =>
  request({url: url[size]({id, ext}), agent})
    .then(({res}) => new Promise((resolve, reject) => {
      var file = path.join(location,
        `wallhaven${size === 'thumb' ? '-th' : ''}-${id}.${ext}`)
      res.pipe(
        fs.createWriteStream(file).on('close', resolve).on('error', reject))
    }))
    .catch((err) => {
      if (ext === 'jpg' && err.message === '404 Not Found') {
        return get({id, ext: 'png', size, location, agent})
      }
      else {
        throw err
      }
    })

var download = ({
  wallpapers,
  size = 'thumb',
  location = process.cwd(),
  agent = new https.Agent({keepAlive: true, maxSockets: 3}),
}) => Promise.all(
  [].concat(wallpapers)
    .map(({id}) => get({id, ext: 'jpg', size, location, agent}))
)

module.exports = Object.assign(download, {get})
