'use strict'

const chalk = require('chalk')

const text = module.exports = {}

var pkgV = require('../../package.json')

text.notReady = `Under construction...`

text.subtheme = {
  description: `Generate new subtheme_t3kit_name`,

  templateVersion: `Which subtheme_t3kit_template version you want to use?`,
  templateVersionMaster: `Last commit on ${chalk.bold('master')} branch`,
  templateVersionTag: `Last stable version of subtheme_t3kit_template`,

  siteName: `Site name:`,
  siteNameIsOk: `Check site name. Is it correct?`,

  dirName: `Create a new folder with name:`,

  hint: {
    siteName: `start with a small letter, one word, or use camelCase`
  },
  err: {
    noName: `Please enter site name`,
    capitalLetter: `Do not use a capital first letter`,
    oneWord: `Should be one word or use camelCase`,
    camelCase: `Use camelCase`,
    dirName: `Folder exists. Please choose another folder name.`
  }
}

text.release = {
  description: `Generate new t3kit release`
}



text.showHelp = `
  ${chalk.bold('t3kit-cli')} v${pkgV.version}
  t3kit Command line interface

  ${chalk.bold.underline('Usage:')}
  t3kit
  t3kit [options]

  ${chalk.bold.underline('Options:')}
  -h, --help           Quick help.
  -v, --version        Print the t3kit-cli version.
  -s, --subtheme       ${text.subtheme.description}
  `
