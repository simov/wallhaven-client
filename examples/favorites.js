
var wh = require('../')


;((key) => ({

  // login and list favorites
  0: async () => {
    var user = '[USER]'
    var pass = '[PASS]'

    // login
    var cookie = await wh.login({user, pass})
    // store the cookie somewhere, no need to login every time

    // get all collections
    var {collections} = await wh.favorites({cookie})
    console.log('collections:', collections)

    // get the first collection
    var {wallpapers, pages} = await wh.favorites({
      id: collections[0].id,
      cookie,
    })
    console.log(wallpapers)
    console.log('pages:', pages)
  },

  // download favorites collection
  1: async () => {
    var cookie = '[SESSION]'
    var id = '[COLLECTION_ID]'

    // use 3 persistent sockets
    var https = require('https')
    var agent = new https.Agent({keepAlive: true, maxSockets: 3})

    var download = async (page = 1) => {
      var {wallpapers, pages} = await wh.favorites({id, page, cookie, agent})
      await Promise.all(wallpapers.map(({id}) => wh.image({id, size: 'full', agent})))
      if (page < pages) {
        download(++page)
      }
    }

    download()
  },

}[key]()))(process.argv[2])
