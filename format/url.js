
module.exports = {

  page: (path) =>
    `https://alpha.wallhaven.cc/${path}`,

  thumb: (id) =>
    `https://alpha.wallhaven.cc/wallpapers/thumb/small/th-${id}.jpg`,

  full: (id, ext = 'jpg') =>
    `https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-${id}.${ext}`,

  short: (id) =>
    `https://whvn.cc/${id}`,

}
