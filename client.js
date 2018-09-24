
var compose = require('request-compose')

var fs = require('fs')
var path = require('path')

var format = {
  search: require('./format/search'),
  wallpaper: require('./format/wallpaper'),
  url: require('./format/url'),
}


module.exports = {

  search: (params) => compose(
    _ => compose.client({
      url: format.url.page('search'),
      qs: Object.keys(params || {})
        .filter((key) => key !== 'agent')
        .reduce((all, key) => (all[key] = params[key], all), {}),
      agent: params.agent,
    }),
    ({body}) => format.search(body)
  )(),

  wallpaper: ({id, agent}) => compose(
    _ => compose.client({
      url: format.url.page(`wallpaper/${id}`),
      agent,
    }),
    ({body}) => format.wallpaper(body)
  )(),

  image: ({id, size = 'thumb', ext = 'jpg', location = process.cwd(), agent}) =>
    compose.stream({url: format.url[size](id, ext), agent})
      .then(({res}) => new Promise((resolve, reject) => {
        var file = `wallhaven${size === 'thumb' ? '-th' : ''}-${id}.${ext}`
        res.pipe(
          fs.createWriteStream(path.join(location, file))
            .on('close', resolve)
            .on('error', reject))
      }))
      .catch((err) => ext === 'jpg' && err.message === '404 Not Found'
        ? module.exports.image({id, size, ext: 'png', location, agent})
        : Promise.reject(err)
      ),

}
