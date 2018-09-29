
var wh = require('../')


;((key) => ({

  // PNG wallpaper, no source
  0: async () => {
    var meta = await wh.wallpaper({id: '527712'})
    console.log(meta)
  },

  // PNG wallpaper with source field
  1: async () => {
    var meta = await wh.wallpaper({id: '651423'})
    console.log(meta)
  },

  // set request-compose options
  2: async () => {
    var meta = await wh.wallpaper({
      id: '527712',
      headers: {'user-agent': 'wallhaven-client'},
      timeout: 10000,
    })
    console.log(meta)
  },

}[key]()))(process.argv[2])
