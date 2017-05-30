'use strict'

// var fs = require('fs')
const shell = require('shelljs')
const chalk = require('chalk')
const variables = require('../variables')
const helpers = require('../helpers')
const prompt = require('../prompt')
const text = require('../text')

const check = module.exports = {}

check.isInstalled = function isInstalled () {
  // Check is git installed
  if (!shell.which('git')) {
    console.log(chalk.red('Sorry, this script requires git'))
    shell.exit(1)
  }

  // Check node version
  const nodeVer = variables.env.node
  if (Number(process.version.match(/^v(\d+\.\d+)/)[1]) < nodeVer) {
    console.log(chalk.red('Need to install new version of node.js ') + chalk.green('>= ' + variables.env.node + '.0'))
    shell.exit(1)
  }
}

check.folder = function folder (cache) {
  // Check folder
  if (!helpers.pwd().endsWith('typo3conf/ext')) {
    return prompt.isOk(cache, text.subtheme.hint.dirName)
  }
}
