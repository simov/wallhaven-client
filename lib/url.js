
var url = (path) =>
  `https://alpha.wallhaven.cc/${path}`

var thumb = ({id}) =>
  `https://alpha.wallhaven.cc/wallpapers/thumb/small/th-${id}.jpg`

var full = ({id, ext}) =>
  `https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-${id}.${ext}`

module.exports = Object.assign(url, {thumb, full})
