
var url = require('./url')


module.exports = (html) => {

  var collections = (() => {
    var regex = /id="collection-(\d+).*?(public|private).*?<small>(\d+).*?>(.*?)</gi
    var match = null, collections = []
    while (match = regex.exec(html)) {
      var [_, id, privacy, total, name] = match
      collections.push({id, name, [privacy]: true, total: parseInt(total)})
    }
    return collections
  })()

  var pages = (() => {
    var pages = /thumb-listing-page-num">\d+<\/span> \/ (\d+)/.exec(html)
    return pages && pages[1] ? parseInt(pages[1]) : 1
  })()

  // same as search
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

  return {collections, wallpapers, pages}
}
