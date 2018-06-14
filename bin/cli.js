
var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log(`
    Search (see docs)
      --q
      --categories
      --purity
      --resolutions
      --atleast
      --ratios
      --colors
      --sorting
      --topRange
      --order
      --page
    Download
      --size            thumb|full
      --location        /path/to/download/location
  `)
  process.exit()
}

var config = require('../config/params')
var wh = require('../')

var params = Object.keys(argv)
  .filter((key) => config.search.includes(key))
  .reduce((params, key) => (params[key] = argv[key], params), {})

var options = Object.keys(argv)
  .filter((key) => config.download.includes(key))
  .reduce((options, key) => (options[key] = argv[key], options), {})

;(async () => {
  try {
    var wallpapers = await wh.search(params)

    wallpapers.forEach(({id, purity, category, resolution, favorites}) => {
      console.log(
        'id', id, 'purity', purity, 'category', category,
        'resolution', resolution, 'favorites', favorites
      )
      console.log('page', wh.url(`wallpaper/${id}`))
      console.log('thumb', wh.url.thumb({id}))
      console.log('full', wh.url.full({id, ext: 'jpg'}))
      console.log('-----------------------------------')
    })

    if (/thumb|full/.test(argv.size)) {
      await wh.download({
        wallpapers,
        size: options.size,
        location: options.location,
      })
    }
  }
  catch (err) {
    delete err.res
    console.error(err)
  }
})()
