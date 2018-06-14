
var wh = require('../')

;(async () => {
  try {
    // https://alpha.wallhaven.cc/search?categories=001&purity=100&resolutions=1920x1080&sorting=date_added
    var wallpapers = await wh.search({
      categories: '001',
      purity: '100',
      resolutions: '1920x1080',
      sorting: 'date_added',
    })
    // download wallpapers
    await wh.download({
      wallpapers,
      size: 'full',
    })
    console.log('DONE!')
  }
  catch (err) {
    console.error(err)
  }
})()
