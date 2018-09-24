
var wh = require('../')


;((key) => ({

  // download wallpaper thumbnail
  0: async () => {
    await wh.image({id: '489973'})
  },

  // download full sized wallpaper image
  1: async () => {
    await wh.image({id: '489973', size: 'full'})
  },

  // download full sized PNG wallpaper image
  2: async () => {
    await wh.image({id: '527712', size: 'full', ext: 'png'})
  },

  // download random wallpaper
  3: async () => {
    var random = (min, max) => Math.floor(Math.random() * (max - min)) + min

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
    var {id} = wallpapers[random(0, wallpapers.length - 1)]

    // download the wallpaper
    await wh.image({id, size: 'full'})
  },

  // download the top 5 wallpapers from the last week
  4: async () => {
    // get the top list
    var {wallpapers} = await wh.search({
      purity: '100',
      sorting: 'toplist',
      topRange: '1w',
    })

    // use 3 persistent sockets
    var https = require('https')
    var agent = new https.Agent({keepAlive: true, maxSockets: 3})

    // download
    await Promise.all(
      wallpapers.slice(0, 5).map(({id}) => wh.image({id, size: 'full', agent})))

    // destroy all sockets
    agent.destroy()

    console.log('query:', 'https://alpha.wallhaven.cc/search?purity=100&sorting=toplist&topRange=1w')
  },

}[key]()))(process.argv[2])
