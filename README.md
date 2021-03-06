
# wallhaven-client

[![npm-version]][npm]

> _[wallhaven.cc] HTTP Client_

# Table of Contents

  - **[API](#api)**
  - **[Arguments](#arguments)**
    - [search](#search) / [wallpaper](#wallpaper) / [image](#image) / [login](#login) / [favorites](#favorites)
  - **[Examples](#examples)**

# API

Name      | Arguments     | Returns    | Description
:---      | :---          | :---       | :---
search    | `{q, categories, purity, resolutions, atleast, ratios, colors, sorting, topRange, order, page, ...options}` | `{Object}`  | Filter wallpapers
wallpaper | `{id, ...options}`        | `{Object}` | Get full meta data about wallpaper
image     | `{id, size, ext, location, ...options}` | writes to file | Download single image
login     | `{user, pass, ...options}` | cookie string | Login to Wallhaven
favorites | `{id, page, cookie, ...options}` | `{Object}` | Get meta data about user's collections and the wallpapers in them

```js
var wh = require('wallhaven-client')

;(async () => {
  var {count, total, pages, tags, wallpapers} = await wh.search({q: 'steampunk'})
  var meta = await wh.wallpaper({id: '527712'})
  await wh.image({id: '527712'})
  var cookie = await wh.login({user, pass})
  var {collections, wallpapers, pages} = await wh.favorites({cookie})
})()
```

<details>
<summary><strong>search</strong></summary>

```js
{
  count: 24,
  total: 144,
  pages: 6,
  tags: [ { id: '874', name: 'steampunk', purity: 'sfw' } ],
  wallpapers: [
    { id: '102569',
      purity: 'sfw',
      category: 'general',
      resolution: '1920x1080',
      favorites: 243,
      urls:
       { page: 'https://alpha.wallhaven.cc/wallpaper/102569',
         thumb: 'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-102569.jpg',
         full: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-102569.jpg',
         short: 'https://whvn.cc/102569' } },
    { id: '1182',
      purity: 'sfw',
      category: 'general',
      resolution: '2560x1600',
      favorites: 123,
      urls:
       { page: 'https://alpha.wallhaven.cc/wallpaper/1182',
         thumb: 'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-1182.jpg',
         full: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-1182.jpg',
         short: 'https://whvn.cc/1182' } }
  ]
}
```

</details>

<details>
<summary><strong>wallpaper</strong></summary>

```js
{
  id: '651423',
  resolution: '2000 x 1285',
  ratio: undefined,
  category: 'Anime',
  purity: 'sfw',
  size: '5.1 MiB',
  views: '700',
  favorites: '6',
  tags:
   [ { id: '1', name: 'anime', purity: 'sfw' },
     { id: '45595', name: 'Macross Delta', purity: 'sfw' },
     { id: '54814', name: 'Kaname Buccaneer', purity: 'sfw' },
     { id: '45559', name: 'Mikumo Guynemer', purity: 'sfw' },
     { id: '74518', name: 'Makina Nakajima', purity: 'sfw' },
     { id: '49846', name: 'Freyja Wion', purity: 'sfw' },
     { id: '74689', name: 'Reina Prowler', purity: 'sfw' },
     { id: '5063', name: 'Macross', purity: 'sfw' } ],
  colors: [ 'abbcda', 'cccccc', 'ffffff', '66cccc', '999999' ],
  source: 'https://www.pixiv.net/member_illust.php?mode=medium&amp;illust_id=65239432',
  uploader:
   { username: 'AksumkA',
     avatar: 'https://static.wallhaven.cc/images/user/avatar/32/2_82aff6c49745ac98ef5dda356aabed354de0f398c783ef8e9d4d8b734c283074.png',
     group: 'owner',
     profile: 'https://alpha.wallhaven.cc/user/AksumkA' },
  date: '2018-05-06T21:11:47+00:00',
  urls:
   { page: 'https://alpha.wallhaven.cc/wallpaper/651423',
     thumb: 'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-651423.jpg',
     full: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-651423.png',
     short: 'https://whvn.cc/651423' },
  ext: 'png'
}
```

</details>

<details>
<summary><strong>favorites</strong></summary>

```js
{
  collections: [
    { id: '121373', name: 'Default', private: true, total: 40 },
    { id: '308194', name: 'Science', public: true, total: 9 } ],
  wallpapers: [
    { id: '703709',
      purity: 'sfw',
      category: 'general',
      resolution: '3353x1588',
      favorites: 129,
      urls:
       { page: 'https://alpha.wallhaven.cc/wallpaper/703709',
         thumb: 'https://alpha.wallhaven.cc/wallpapers/thumb/small/th-703709.jpg',
         full: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-703709.jpg',
         short: 'https://whvn.cc/703709' } }
  ],
  pages: 2
}
```

</details>


# Arguments

## search

Parameter   | Value
:-          | :-
q           | any search term, or tag id `id:853`, `@username`, `type:{png/jpg/jpeg}`
categories  | see below
purity      | see below
resolutions | `1920x1080` or `1920x1080,1920x1200`
atleast     | `1920x1080`
ratios      | `16x9` or `16x9,16x10`
colors      | `660000`, `990000`, `cc0000`, `cc3333`, `ea4c88`, `993399`, `663399`, `333399`, `0066cc`, `0099cc`, `66cccc`, `77cc33`, `669900`, `336600`, `666600`, `999900`, `cccc33`, `ffff00`, `ffcc33`, `ff9900`, `ff6600`, `cc6633`, `996633`, `663300`, `000000`, `999999`, `cccccc`, `ffffff`, `424153`
sorting     | `relevance`, `random`, `date_added`, `views`, `favorites`, `toplist`
topRange    | `1d`, `3d`, `1w`, `1M`, `3M`, `6M`, `1y`, only available for `sorting=toplist`
order       | `desc`, `asc`
page        | any number
...options  | `agent, timeout` (any [request-compose][compose-client-options] option)

---

Parameter / Value | 000  | 100     | 010     | 001    | 111
:-                | :-:  | :-:     | :-:     | :-:    | :-:
categories        | none | general | anime   | people | all
purity            | none | sfw     | sketchy | nsfw   | all

> _+ any combination_

---

> Note that currently there is no information on the search page about the actual file extension of the wallpaper. The `urls.full` key will always point to an image with `.jpg` file extension. The [image](#image) download API however will retry to download the image with `.png` file extension if it fails with `.jpg`.

> The search returns up to 24 wallpapers.

---

## wallpaper

Parameter  | Value
:-         | :-
id         | Wallpaper ID
...options | `agent, timeout` (any [request-compose][compose-client-options] option)


---

## image

Parameter  | Value
:-         | :-
id         | Wallpaper ID
size       | `'thumb'` or `'full'` (defaults to thumb)
ext        | `'jpg'` or `'png'` (defaults to jpg)
location   | Download location (defaults to [process.cwd][process-cwd])
...options | `agent, timeout` (any [request-compose][compose-client-options] option)

---

## login

Parameter  | Value
:-         | :-
user       | Username
pass       | Password
...options | `agent, timeout` (any [request-compose][compose-client-options] option)

---

## favorites

Parameter  | Value
:-         | :-
id         | Collection ID
page       | any number
cookie     | Session cookie
...options | `agent, timeout` (any [request-compose][compose-client-options] option)


# Examples

> [search][example-search] / [wallpaper][example-wallpaper] / [image][example-image] / [favorites][example-favorites]

```bash
node examples/search.js [example index]
node examples/wallpaper.js [example index]
node examples/image.js [example index]
node examples/favorites.js [example index]
```


  [npm-version]: https://img.shields.io/npm/v/wallhaven-client.svg?style=flat-square (NPM Package Version)
  [travis-ci]: https://img.shields.io/travis/simov/wallhaven-client/master.svg?style=flat-square (Build Status - Travis CI)
  [coveralls-status]: https://img.shields.io/coveralls/simov/wallhaven-client.svg?style=flat-square (Test Coverage - Coveralls)
  [codecov-status]: https://img.shields.io/codecov/c/github/simov/wallhaven-client.svg?style=flat-square (Test Coverage - Codecov)

  [npm]: https://www.npmjs.com/package/wallhaven-client
  [travis]: https://travis-ci.org/simov/wallhaven-client
  [coveralls]: https://coveralls.io/github/simov/wallhaven-client
  [codecov]: https://codecov.io/github/simov/wallhaven-client?branch=master

  [wallhaven.cc]: https://alpha.wallhaven.cc

  [process-cwd]: https://nodejs.org/dist/latest-v10.x/docs/api/process.html#process_process_cwd
  [compose-client-options]: https://github.com/simov/request-compose#options

  [example-search]: https://github.com/simov/wallhaven-client/blob/master/examples/search.js
  [example-wallpaper]: https://github.com/simov/wallhaven-client/blob/master/examples/wallpaper.js
  [example-image]: https://github.com/simov/wallhaven-client/blob/master/examples/image.js
  [example-favorites]: https://github.com/simov/wallhaven-client/blob/master/examples/favorites.js
