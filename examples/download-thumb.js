
var wh = require('../')

;(async () => {
  try {
    // https://alpha.wallhaven.cc/search?purity=100&resolutions=1920x1080%2C1920x1200&sorting=toplist&topRange=1w&page=2
    var {wallpapers} = await wh.search({
      purity: '100',
      resolutions: '1920x1080,1920x1200',
      sorting: 'toplist',
      topRange: '1w',
      page: '2',
    })
    // download thumbnails
    await wh.download({
      wallpapers,
      size: 'thumb',
    })
    console.log('DONE!')
  }
  catch (err) {
    console.error(err)
  }
})()
