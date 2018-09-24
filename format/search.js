
var url = require('./url')


module.exports = (html) => {

  var total = (() => {
    var total = /([\d,]+) Wallpapers found/i.exec(html)
    return total ? parseInt(total[1].replace(/,/g, '')) : undefined
  })()

  var tags = (() => {
    var regex = /tagname (\w+).*?tag\/(\d+)">([\w\s]+)</gi, match = null, tags = []
    while (match = regex.exec(html)) {
      var [_, purity, id, name] = match
      tags.push({id, name, purity})
    }
    return tags
  })()

  var pages = (() => {
    var [_, pages] = /page-num".*?(\d+)(?=<\/h2)/i.exec(html)
    return parseInt(pages)
  })()

  var wallpapers = (() => {
    var regex =
      /thumb-(\d+).*?thumb-(\w+).*?thumb-(\w+).*?res.*?>(.*?)<.*?favs.*?>(\d+)</gi
    var match = null, wallpapers = []

    while (match = regex.exec(html)) {
      var [_, id, purity, category, resolution, favorites] = match
      wallpapers.push({
        id,
        purity,
        category,
        resolution: resolution.replace(/ /g, ''),
        favorites: parseInt(favorites),
        urls: {
          page: url.page(`wallpaper/${id}`),
          thumb: url.thumb(id),
          full: url.full(id),
          short: url.short(id),
        }
      })
    }

    return wallpapers
  })()

  var count = wallpapers.length

  return {count, total, pages, tags, wallpapers}
}
