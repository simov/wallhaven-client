
var wh = require('../')

var random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

;(async () => {
  try {
    // https://alpha.wallhaven.cc/search?purity=100&atleast=1920x1080&sorting=random
    var params = {
      purity: '100',
      atleast: '1920x1080',
      sorting: 'random',
    }
    // get pages count for this filter
    var {pages} = await wh.search(params)
    // pick random page from this filter
    var {wallpapers} = await wh.search({...params, page: random(1, pages)})
    // pick random wallpaper from the returned page
    await wh.download({
      wallpapers: wallpapers[random(0, wallpapers.length - 1)],
      size: 'full',
    })
    console.log('DONE!')
  }
  catch (err) {
    console.error(err)
  }
})()
