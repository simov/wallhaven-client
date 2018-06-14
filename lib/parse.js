
var regex =
  /thumb-(\d+).*?thumb-(\w+).*?thumb-(\w+).*?res.*?>(.*?)<.*?favs.*?>(\d+)</gi

var parse = (html) => {
  var match = null
  var meta = []

  while (match = regex.exec(html)) {
    var [_, id, purity, category, resolution, favorites] = match
    meta.push({
      id,
      purity,
      category,
      resolution: resolution.replace(/ /g, ''),
      favorites: parseInt(favorites),
    })
  }

  return meta
}

module.exports = parse
