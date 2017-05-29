'use strict'

// const chalk = require('chalk')
const text = require('../text')

const help = module.exports = {}

// generator help message
help.allHelp = function allHelp (cache) {
  console.log(text.showHelp)
  return cache
}

// check pxa generator version from package.json
help.showVersion = function showVersion (cache) {
  var pkgV = require('../../package.json')
  let showVersion = `${pkgV.version}`
  console.log(showVersion)
  return cache
}
