
var wh = require('../')

;(async () => {
  try {
    // https://alpha.wallhaven.cc/search?q=steampunk&categories=101&purity=100&atleast=1920x1080&sorting=favorites&colors=424153
    var {total, tags, pages, wallpapers} = await wh.search({
      q: 'steampunk',
      categories: '101',
      purity: '100',
      atleast: '1920x1080',
      sorting: 'favorites',
      colors: '424153',
    })
    wallpapers.forEach(({id, purity, category, resolution, favorites}) => {
      // meta
      console.log(
        'id', id, 'purity', purity, 'category', category,
        'resolution', resolution, 'favorites', favorites
      )
      // page URL
      console.log('page', wh.url(`wallpaper/${id}`))
      // thumbnail URL
      console.log('thumb', wh.url.thumb({id}))
      // wallpaper URL
      console.log('full', wh.url.full({id, ext: 'jpg'}))
      console.log('-----------------------------------')
    })
    // related tags
    console.log('tags')
    tags.forEach(({id, name, purity}) => {
      console.log('id', id, 'name', name, 'purity', purity)
      console.log('page', wh.url(`tag/${id}`))
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    })
    // total wallpapers found
    console.log('total', total)
    // number of pages
    console.log('pages', pages)
  }
  catch (err) {
    console.error(err)
  }
})()
