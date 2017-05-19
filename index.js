#!/usr/bin/env node

'use strict'

const _ = require('lodash')
const prompt = require('./lib/prompt')
const chalk = require('chalk')
const helpers = require('./lib/helpers')
// const variables = require('./lib/variables')
// const git = require('./lib/git')
const help = require('./lib/help')
const check = require('./lib/check')
// const parse = require('./lib/parse')
// const dep = require('./lib/dep')
const argv = require('minimist')(process.argv.slice(2))
// const cmd = require('./lib/cmd')
// const subtheme = require('./lib/subtheme')

var cache = {}

// Check is installed main dependencies
// ====================================================
check.isInstalled()

// Clone MobileApp Template
// ====================================================
// function subtheme () {
//   return helpers.promiseChainStarter(cache)
//   .then((val) => { console.log(val) })
//   .catch(helpers.error)
// }

// main start point
// ====================================================
function run () {
  prompt.whatToDo(cache)
  .then(() => {
    if (cache.whatToDo === 'subtheme') {
      console.log(chalk.red('Under construction.'))
      process.exit(1)
    } else if (cache.whatToDo === 'help') {
      help.allHelp()
    }
  })
  .catch(helpers.error)
}

// parse arguments
// ====================================================
if (_.size(argv) !== 1 || argv._.length) {
  // t3kit  -h, --help
  if (argv.h || argv.help) {
    help.allHelp()

  // t3kit  -v, --version
  } else if (argv.v || argv.version) {
    help.showVersion()

  // t3kit  -s, --subtheme
  } else if (argv.s || argv.subtheme) {
    cache.whatToDo = 'subtheme'
    console.log(chalk.red('Under construction.'))
    process.exit(1)
  } else {
    help.allHelp()
  }
} else {
  run()
}
