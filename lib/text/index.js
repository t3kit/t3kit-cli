'use strict'

const chalk = require('chalk')

const helpers = require('../helpers')
const text = module.exports = {}

var pkgV = require('../../package.json')

text.notReady = `Under construction...`

text.subtheme = {
  description: `Generate new subtheme_t3kit_name`,

  templateVersion: `Which subtheme_t3kit_template version you want to use?`,
  templateVersionMaster: `Last commit on ${chalk.blue('master')} branch`,
  templateVersionTag: (cache) => `Last stable version of subtheme_t3kit_template ${chalk.green(cache.lastTag)}`,

  siteName: `Site name:`,
  siteNameIsOk: `Check site name one more time. Is it correct?`,

  dirName: `Create a new folder with name:`,
  done (cache) {
    return `
      ${chalk.bold('Done!')}
      ${chalk.cyan(`subtheme_t3kit_${cache.siteName}`)} successfully created!
    `
  },
  initialCommit: (cache) => `initial commit, based on subtheme_t3kit_template v${cache.lastTag}`,
  finalCommit: (cache) => `initialize new subtheme_t3kit_${cache.siteName}`,

  hint: {
    siteName: `start with a small letter, one word, or use camelCase`,
    welcome: `
      The best place to generate subtheme
      for t3kit project is ${chalk.yellow(`typo3conf/ext`)} folder.
      New subtheme will depend on ${chalk.cyan(`theme_t3kit`)}, which
      already should be installed in ${chalk.yellow(`typo3conf/ext/theme_t3kit`)}.
      So to start generate subtheme - open needed folder
      and only after that execute t3kit subtheme generator.
    `,
    dirName: `Your current directory is ${chalk.yellow(helpers.pwd())}, are you sure you want to continue?`
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
