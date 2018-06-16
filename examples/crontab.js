
var location = process.argv[2]
if (!location) {
  console.log('Specify download location')
  process.exit()
}

// set background wallpaper in Gnome
var command = 'gsettings set org.gnome.desktop.background picture-uri'

var fs = require('fs')
var cp = require('child_process')
var wh = require('../')

var random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

;(async () => {
  try {
    var {wallpapers} = await wh.search({
      q: 'steampunk',
      categories: '100',
      purity: '100',
      atleast: '1920x1080',
      sorting: 'random',
      colors: '424153',
    })
    // download one of the 24 returned wallpapers
    var wp = wallpapers[random(0, 23)]
    await wh.download({
      wallpapers: wp,
      size: 'full',
      location,
    })
    // set file extension
    var fname = `wallhaven-${wp.id}.jpg`
    var ext = fs.readdirSync(location).includes(fname) ? 'jpg' : 'png'
    var fpath = `${location}/wallhaven-${wp.id}.${ext}`
    // change wallpaper
    cp.exec(`${command} ${fpath}`)
  }
  catch (err) {
    console.error(err)
  }
})()
