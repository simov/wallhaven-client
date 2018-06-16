
var total = (html) => {
  var match = /([\d,]+) Wallpapers found/i.exec(html)
  if (match) {
    var [_, total] = match
    return parseInt(total.replace(/,/g, ''))
  }
}

var tags = (html) => {
  var regex = /tagname (\w+).*?tag\/(\d+)">([\w\s]+)</gi
  var tags = []
  var match = null

  while (match = regex.exec(html)) {
    var [_, purity, id, name] = match
    tags.push({id, name, purity})
  }

  return tags
}

var pages = (html) => {
  var [_, pages] = /page-num".*?(\d+)(?=<\/h2)/i.exec(html)
  return parseInt(pages)
}

var wallpapers = (html) => {
  var regex =
    /thumb-(\d+).*?thumb-(\w+).*?thumb-(\w+).*?res.*?>(.*?)<.*?favs.*?>(\d+)</gi
  var wallpapers = []
  var match = null

  while (match = regex.exec(html)) {
    var [_, id, purity, category, resolution, favorites] = match
    wallpapers.push({
      id,
      purity,
      category,
      resolution: resolution.replace(/ /g, ''),
      favorites: parseInt(favorites),
    })
  }

  return wallpapers
}

module.exports = {total, tags, pages, wallpapers}
