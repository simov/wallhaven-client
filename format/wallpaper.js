
var url = require('./url')


module.exports = (html) => {

  var [_, resolution] = /showcase-resolution.*?>(.*?)</.exec(html)

  var ratio = (() => {
    var ratio = /showcase-resolution.*?title="(\d+:\d+)/.exec(html)
    return (ratio && ratio[1]) || undefined
  })()

  var source = (() => {
    var source =
      /showcase-source.*?<em.*?>(.*?)</.exec(html) ||
      /showcase-source.*?href="(.*?)"/.exec(html)
    return (source && source[1]) || undefined
  })()

  var colors = (() => {
    var regex = /search\?colors=(.*?)"/gi, match = null, colors = []
    while (match = regex.exec(html)) {
      var [_, color] = match
      colors.push(color)
    }
    return colors
  })()

  var tags = (() => {
    var regex = /tag tag-(\w+).*?tag-(\d+).*?<a.*?>(.*?)</gi, match = null, tags = []
    while (match = regex.exec(html)) {
      var [_, purity, id, name] = match
      tags.push({id, name, purity})
    }
    return tags
  })()

  var [_, purity] = /wallpaper-purity-form.*?checked="checked".*?purity (\w+)/.exec(html)

  var uploader = (() => {
    var [_, username] = /showcase-uploader.*?username.*?>(.*?)</.exec(html)
    var [_, avatar] = /showcase-uploader.*?img src="(.*?)"/.exec(html)
    var groups = {
      2: 'user', 3: 'moderator', 4: 'senior moderator',
      5: 'administrator', 6: 'developer', 7: 'owner'
    }
    var [_, group] = /showcase-uploader.*?usergroup-(\d+)/.exec(html)
    return {
      username, avatar: `https:${avatar}`, group: groups[group],
      profile: url.page(`user/${username}`)
    }
  })()

  var [_, date] = /showcase-uploader.*?datetime="(.*?)"/.exec(html)

  var [_, category] = /dt>Category.*?dd>(.*?)</.exec(html)
  var [_, size] = /dt>Size.*?dd>(.*?)</.exec(html)
  var [_, views] = /dt>Views.*?dd>(.*?)</.exec(html)
  var [_, favorites] = /User Favorites.*?>(\d+)/.exec(html)
  var [_, id] = /whvn\.cc\/(\d+)/.exec(html)

  var urls = {
    page: url.page(`wallpaper/${id}`),
    thumb: url.thumb(id),
    full: `https:${/id="wallpaper" src="(.*?)"/.exec(html)[1]}`,
    short: url.short(id),
  }

  var ext = urls.full.replace(/.*\.(\w+)$/, '$1')

  return {
    id, resolution, ratio, category, purity,
    size, views, favorites, tags, colors,
    source, uploader, date, urls, ext,
  }
}
