'use strict'

const chalk = require('chalk')
const labels = require('../labels')

const help = module.exports = {}

// generator help message
help.allHelp = function allHelp (cache) {
  var pkgV = require('../../package.json')
  let showHelp = `
  ${chalk.bold('t3kit-cli')} v${pkgV.version}
  Command line interface

  ${chalk.bold.underline('Usage:')}
  t3kit
  t3kit [options]

  ${chalk.bold.underline('Options:')}
  -h, --help           Quick help.
  -v, --version        Print the t3kit-cli version.
  -s, --subtheme       ${labels.subtheme.description}
  `
  console.log(showHelp)
  return cache
}

// check pxa generator version from package.json
help.showVersion = function showVersion (cache) {
  var pkgV = require('../../package.json')
  let showVersion = `${pkgV.version}`
  console.log(showVersion)
  return cache
}
