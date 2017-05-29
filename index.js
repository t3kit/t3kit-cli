#!/usr/bin/env node

'use strict'

const _ = require('lodash')
const prompt = require('./lib/prompt')
const chalk = require('chalk')
const helpers = require('./lib/helpers')
// const variables = require('./lib/variables')
const git = require('./lib/git')
const help = require('./lib/help')
const check = require('./lib/check')
const parse = require('./lib/parse')
// const dep = require('./lib/dep')
const argv = require('minimist')(process.argv.slice(2))
const cmd = require('./lib/cmd')
// const subtheme = require('./lib/subtheme')
const text = require('./lib/text')

var cache = {}

// Check is installed main dependencies
// ====================================================
check.isInstalled()

// Generate subtheme t3kit template
// ====================================================
function generateSubtheme () {
  return helpers.promiseChainStarter(cache)
  .then(prompt.subthemeQuestions)
  .then(prompt.siteName)
  .then(prompt.dirName)
  .then(cmd.mkdir)
  .then(() => git.clone(cache, `https://github.com/t3kit/subtheme_t3kit_template.git`))
  .then(() => cmd.setWorkDir(cache, cache.dirName))
  .then(git.getLastTag)
  .then(prompt.templateVersion)
  .then(git.checkout)
  .then(git.removeRepo)
  .then(git.init)
  .then(git.add)
  .then(() => git.commit(cache, `initial commit, based on subtheme_t3kit_template v${cache.lastTag}`))
  .then(() => cmd.readFilesRecursively(cache, `Configuration`, `Resources/Private`, 'Meta'))
  .then(() => parse.replaceString(cache, `subtheme_t3kit_template`, `subtheme_t3kit_${cache.siteName}`))
  .then(() => parse.replaceString(cache, `Subtheme t3kit template`, `Subtheme ${cache.siteName}`))

  .then(() => cmd.rmFile(cache, `LICENSE.txt`))
  .then(() => cmd.rmFile(cache, `CHANGELOG.md`))
  .then(() => cmd.rmFile(cache, `README.md`))
  .then(() => cmd.renameFile(cache, `readmeTemplate.md`, `README.md`))
  .then(() => cmd.appendFile(cache, `README.md`, `**Built on [subtheme_t3kit_template](https://github.com/t3kit/subtheme_t3kit_template) v${cache.lastTag}**`))

  .then(git.add)
  .then(() => git.commit(cache, `initialize new subtheme_t3kit_${cache.siteName}`))

  // .then((val) => { console.log(val) })
  .catch(helpers.error)
}
// main start point
// ====================================================
function run () {
  prompt.whatToDo(cache)
  .then(() => {
    if (cache.whatToDo === 'subtheme') {
      generateSubtheme()
    } else if (cache.whatToDo === 'release') {
      console.log(chalk.red(text.notReady))
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
    console.log(chalk.red(text.notReady))
    process.exit(1)
  } else {
    help.allHelp()
  }
} else {
  run()
}
