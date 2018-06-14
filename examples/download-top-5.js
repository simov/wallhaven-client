
var wh = require('../')

;(async () => {
  try {
    // https://alpha.wallhaven.cc/search?q=cyberpunk&purity=100&sorting=views
    var wallpapers = await wh.search({
      q: 'cyberpunk',
      purity: '100',
      sorting: 'views',
    })
    // download the top 5 wallpapers
    await wh.download({
      wallpapers: wallpapers.slice(0, 5),
      size: 'full',
    })
    console.log('DONE!')
  }
  catch (err) {
    console.error(err)
  }
})()
