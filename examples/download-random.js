
var wh = require('../')

var random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

;(async () => {
  try {
    // https://alpha.wallhaven.cc/search?purity=100&atleast=1920x1080&sorting=random
    var wallpapers = await wh.search({
      purity: '100',
      atleast: '1920x1080',
      sorting: 'random',
    })
    // download one of the 24 returned wallpapers
    await wh.download({
      wallpapers: wallpapers[random(0, 23)],
      size: 'full',
    })
    console.log('DONE!')
  }
  catch (err) {
    console.error(err)
  }
})()
