
var wh = require('../')


;((key) => ({

  // complex filter
  0: async () => {
    var {count, total, pages, tags, wallpapers} = await wh.search({
      q: 'steampunk',
      categories: '101',
      purity: '100',
      atleast: '1920x1080',
      sorting: 'favorites',
      colors: '424153',
    })
    console.log(wallpapers)
    console.log('query:', 'https://alpha.wallhaven.cc/search?q=steampunk&categories=101&purity=100&atleast=1920x1080&sorting=favorites&colors=424153')
    console.log('count:', count)
    console.log('total:', total)
    console.log('pages:', pages)
    console.log('tags:', tags)
  },

  // get the second page of the top rated wallpapers for the past week
  1: async () => {
    var {count, total, pages, tags, wallpapers} = await wh.search({
      purity: '100',
      resolutions: '1920x1080,1920x1200',
      sorting: 'toplist',
      topRange: '1w',
      page: '2',
    })
    console.log(wallpapers)
    console.log('query:', 'https://alpha.wallhaven.cc/search?purity=100&resolutions=1920x1080%2C1920x1200&sorting=toplist&topRange=1w&page=2')
    console.log('count:', count)
    console.log('total:', total)
    console.log('pages:', pages)
    console.log('tags:', tags)
  },

  // sort by latest
  2: async () => {
    var {count, total, pages, tags, wallpapers} = await wh.search({
      categories: '001',
      purity: '100',
      resolutions: '1920x1080',
      sorting: 'date_added',
    })
    console.log(wallpapers)
    console.log('query:', 'https://alpha.wallhaven.cc/search?categories=001&purity=100&resolutions=1920x1080&sorting=date_added')
    console.log('count:', count)
    console.log('total:', total)
    console.log('pages:', pages)
    console.log('tags:', tags)
  },

  // search by string
  3: async () => {
    var {count, total, pages, tags, wallpapers} = await wh.search({
      q: 'cyberpunk',
      purity: '100',
      sorting: 'views',
    })
    console.log(wallpapers)
    console.log('query:', 'https://alpha.wallhaven.cc/search?q=cyberpunk&purity=100&sorting=views')
    console.log('count:', count)
    console.log('total:', total)
    console.log('pages:', pages)
    console.log('tags:', tags)
  },

  // search by tag
  4: async () => {
    var {count, total, pages, tags, wallpapers} = await wh.search({
      q: 'id:853', // #fantasy art
      purity: '100',
      rations: '16x9,16x10',
      sorting: 'relevance',
    })
    console.log(wallpapers)
    console.log('query:', 'https://alpha.wallhaven.cc/search?q=id%3A853&purity=100&rations=16x9%2C16x10&sorting=relevance')
    console.log('count:', count)
    console.log('total:', total)
    console.log('pages:', pages)
    console.log('tags:', tags)
  },

  // set request-compose options
  5: async () => {
    var {count, total, pages, tags, wallpapers} = await wh.search({
      q: 'cyberpunk',
      purity: '100',
      sorting: 'views',
      headers: {'user-agent': 'wallhaven-client'},
      timeout: 10000,
    })
    console.log(wallpapers)
    console.log('query:', 'https://alpha.wallhaven.cc/search?q=cyberpunk&purity=100&sorting=views')
    console.log('count:', count)
    console.log('total:', total)
    console.log('pages:', pages)
    console.log('tags:', tags)
  },

}[key]()))(process.argv[2])
