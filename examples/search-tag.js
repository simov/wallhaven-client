
var wh = require('../')

;(async () => {
  try {
    // https://alpha.wallhaven.cc/search?q=id%3A853&purity=100&rations=16x9%2C16x10&sorting=relevance
    var {wallpapers} = await wh.search({
      q: 'id:853', // #fantasy art
      purity: '100',
      rations: '16x9,16x10',
      sorting: 'relevance',
    })
    // download the first 3 thumbnails
    await wh.download({
      wallpapers: wallpapers.slice(0, 3),
      size: 'thumb',
    })
    console.log('DONE!')
  }
  catch (err) {
    console.error(err)
  }
})()
