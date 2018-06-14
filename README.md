
# wallhaven-client

[![npm-version]][npm]

# toc

  - [search](#search)
  - [cli](#cli)
  - [api](#api)
  - [examples](#examples)
  - [crontab](#crontab)

# search

Parameter   | Value
:-          | :-
q           | any search term, or tag id `id:853`
categories  | see below
purity      | see below
resolutions | `1920x1080` or `1920x1080,1920x1200`
atleast     | `1920x1080`
ratios      | `16x9` or `16x9,16x10`
colors      | `#660000`, `#990000`, `#cc0000`, `#cc3333`, `#ea4c88`, `#993399`, `#663399`, `#333399`, `#0066cc`, `#0099cc`, `#66cccc`, `#77cc33`, `#669900`, `#336600`, `#666600`, `#999900`, `#cccc33`, `#ffff00`, `#ffcc33`, `#ff9900`, `#ff6600`, `#cc6633`, `#996633`, `#663300`, `#000000`, `#999999`, `#cccccc`, `#ffffff`, `#424153`, without `#`
sorting     | `relevance`, `random`, `date_added`, `views`, `favorites`, `toplist`
topRange    | `1d`, `3d`, `1w`, `1M`, `3M`, `6M`, `1y`, only available for `sorting=toplist`
order       | `desc`, `asc`
page        | any number

---

Parameter / Value | 000  | 100     | 010     | 001    | 111
:-                | :-:  | :-:     | :-:     | :-:    | :-:
categories        | none | general | anime   | people | all
purity            | none | sfw     | sketchy | nsfw   | all

> _+ any combination_

# cli

```bash
# install globally
npm i -g wallhaven-client
# all available options
wallhaven-client --help
# print meta data (empty search)
wallhaven-client
# print meta data (specific search)
wallhaven-client --q "cyberpunk" --resolutions "1920x1080" --sorting "views"
```

Add `--size` and `--location` to enable image download:

```bash
# download thumbnails (empty search)
wallhaven-client --size thumb --location /path/to/thumbnails
# download wallpapers (empty search)
wallhaven-client --size full --location /path/to/wallpapers
# download wallpapers (specific search)
wallhaven-client \
  --q "steampunk" \
  --purity "100" \
  --atleast "1920x1080" \
  --sorting "favorites" \
  --size full \
  --location /path/to/wallpapers
```

# api

```js
var wh = require('wallhaven-client')

;(async () => {
  try {
    var wallpapers = await wh.search({
      categories: '001',
      purity: '100',
      resolutions: '1920x1080',
      sorting: 'date_added',
    })
    await wh.download({
      wallpapers,
      size: 'full',
      location: '/path/to/location'
    })
    console.log('DONE!')
  }
  catch (err) {
    console.error(err)
  }
})()
```

> https://alpha.wallhaven.cc/search?categories=001&purity=100&resolutions=1920x1080&sorting=date_added

# examples

Example |
:- |
[Print wallpaper meta][print-wallpaper-meta] |
[Download wallpaper thumbnails][download-thumb] |
[Download full sized wallpaper images][download-full] |
[Download only the top 5 wallpapers][download-top-5] |
[Download random wallpaper][download-random] |
[Search by tag][search-tag] |
[Set background wallpaper in Gnome][crontab] |

# crontab

The following command can be used to set the background wallpaper in Gnome:

```
gsettings set org.gnome.desktop.background picture-uri /path/to/image.jpg
```

The implementation may look like this:

> [Set background wallpaper in Gnome][crontab]

Call the above node script through the following bash script:

```bash
#!/bin/bash

PID=$(pgrep -n gnome-session)
export DBUS_SESSION_BUS_ADDRESS=$(grep -z DBUS_SESSION_BUS_ADDRESS /proc/$PID/environ|cut -d= -f2-)
GSETTINGS_BACKEND=dconf

/path/to/node /path/to/wallhaven-client/examples/crontab.js /path/to/download/location

```

Lastly run the above bash script periodically with crontab:

```bash
# run on every 5 minutes
*/5 * * * * /path/to/script.sh
```


  [npm-version]: https://img.shields.io/npm/v/wallhaven-client.svg?style=flat-square (NPM Package Version)
  [travis-ci]: https://img.shields.io/travis/simov/wallhaven-client/master.svg?style=flat-square (Build Status - Travis CI)
  [coveralls-status]: https://img.shields.io/coveralls/simov/wallhaven-client.svg?style=flat-square (Test Coverage - Coveralls)
  [codecov-status]: https://img.shields.io/codecov/c/github/simov/wallhaven-client.svg?style=flat-square (Test Coverage - Codecov)

  [npm]: https://www.npmjs.com/package/wallhaven-client
  [travis]: https://travis-ci.org/simov/wallhaven-client
  [coveralls]: https://coveralls.io/github/simov/wallhaven-client
  [codecov]: https://codecov.io/github/simov/wallhaven-client?branch=master

  [print-wallpaper-meta]: https://github.com/simov/wallhaven-client/blob/master/examples/print-wallpaper-meta.js
  [download-thumb]: https://github.com/simov/wallhaven-client/blob/master/examples/download-thumb.js
  [download-full]: https://github.com/simov/wallhaven-client/blob/master/examples/download-full.js
  [download-top-5]: https://github.com/simov/wallhaven-client/blob/master/examples/download-top-5.js
  [download-random]: https://github.com/simov/wallhaven-client/blob/master/examples/download-random.js
  [search-tag]: https://github.com/simov/wallhaven-client/blob/master/examples/search-tag.js
  [crontab]: https://github.com/simov/wallhaven-client/blob/master/examples/crontab.js
