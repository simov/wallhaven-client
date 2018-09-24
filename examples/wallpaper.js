
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

}[key]()))(process.argv[2])
