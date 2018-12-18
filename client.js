
var compose = require('request-compose')

var fs = require('fs')
var path = require('path')

var format = {
  search: require('./format/search'),
  wallpaper: require('./format/wallpaper'),
  favorites: require('./format/favorites'),
  url: require('./format/url'),
}


module.exports = {

  search: ({
    q, categories, purity, resolutions, atleast,
    ratios, colors, sorting, topRange, order, page,
    ...options
    }) => compose(
      _ => compose.client(Object.assign({}, options, {
        url: format.url.page('search'),
        qs: {
          q, categories, purity, resolutions, atleast,
          ratios, colors, sorting, topRange, order, page
        }
      })),
      ({body}) => format.search(body)
    )(),

  wallpaper: ({id, ...options}) =>
    compose(
      _ => compose.client(Object.assign({}, options, {
        url: format.url.page(`wallpaper/${id}`),
      })),
      ({body}) => format.wallpaper(body)
    )(),

  image: ({id, size='thumb', ext='jpg', location=process.cwd(), ...options}) =>
    compose.stream(Object.assign({}, options, {
      url: format.url[size](id, ext)
    }))
    .then(({res}) => new Promise((resolve, reject) => {
      var file = `wallhaven${size === 'thumb' ? '-th' : ''}-${id}.${ext}`
      res.pipe(
        fs.createWriteStream(path.join(location, file))
          .on('close', resolve)
          .on('error', reject))
    }))
    .catch((err) => ext === 'jpg' && err.message === '404 Not Found'
      ? module.exports.image(Object.assign({},
        options, {id, size, ext: 'png', location}))
      : Promise.reject(err)
    ),

  login: ({user, pass, ...options}) =>
    compose(
      _ => compose.client(Object.assign({}, options, {
        method: 'POST',
        url: 'https://alpha.wallhaven.cc/auth/login',
        form: {
          username: user,
          password: pass,
        }
      })),
      ({res}) => res.headers['set-cookie'].join('; ')
    )(),

  favorites: ({id='', page, cookie, ...options}) =>
    compose(
      _ => compose.client(Object.assign({}, options, {
        url: `https://alpha.wallhaven.cc/favorites/${id}`,
        qs: {page},
        headers: {cookie},
      })),
      ({body}) => format.favorites(body)
    )(),

}
