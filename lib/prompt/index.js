'use strict'

const inquirer = require('inquirer')
const helpers = require('../helpers')
const chalk = require('chalk')
var fs = require('fs')
const text = require('../text')
const variables = require('../variables')

const prompt = module.exports = {}

// ask to select variants
prompt.whatToDo = function whatToDo (cache) {
  return new Promise(function (resolve, reject) {
    let whatToDo = [
      {
        name: `whatToDo`,
        type: `list`,
        message: `Select variants:`,
        choices: [
          {
            name: `${text.subtheme.description}`,
            value: `subtheme`
          },
          {
            name: `${text.release.description}`,
            value: `release`
          },
          {
            name: `Help`,
            value: `help`
          }
        ]
      }
    ]
    inquirer.prompt(whatToDo)
    .then(function (answers) {
      helpers.addTo(cache, answers)
      resolve(cache)
    })
  })
}


// ask main subtheme_t3kit questions
prompt.siteName = function siteName (cache) {
  return new Promise(function (resolve) {
    let siteName = [
      {
        type: 'input',
        name: 'siteName',
        message: `${text.subtheme.siteName} ${chalk.dim(text.subtheme.hint.siteName)}`,
        filter: function (value) {
          return value.trim()
        },
        validate: function (value) {
          if (value.length === 0) {
            return chalk.red(text.subtheme.err.noName)
          } else if (/\s/g.test(value)) {
            return chalk.red(text.subtheme.err.oneWord)
          } else if (/[-_.]/g.test(value)) {
            return chalk.red(text.subtheme.err.camelCase)
          } else if (value[0] === value[0].toUpperCase()) {
            return chalk.red(text.subtheme.err.capitalLetter)
          }
          return true
        }
      },
      {
        type: 'confirm',
        name: 'isOk',
        message: text.subtheme.siteNameIsOk,
        default: true
      }
    ]
    function recursivePrompt () {
      inquirer.prompt(siteName)
      .then(function (answers) {
        if (fs.existsSync(variables.subtheme.dirName(answers))) {
          console.log(` ${chalk.yellow(text.subtheme.warning.nameAlreadyExists(answers))}`)
        }
        if (answers.isOk === false) {
          recursivePrompt()
        } else if (answers.isOk === true) {
          helpers.addTo(cache, answers)
          resolve(cache)
        }
      })
    }
    recursivePrompt()
  })
}

// ask folder name
prompt.dirName = function dirName (cache) {
  return new Promise(function (resolve) {
    let dirName = [
      {
        type: 'imput',
        name: 'dirName',
        message: text.subtheme.dirName,
        filter: function (value) {
          return value.trim()
        },
        default: function () {
          return variables.subtheme.dirName(cache)
        },
        validate: function (value) {
          if (!fs.existsSync(value)) {
            return true
          }
          return chalk.red(text.subtheme.err.dirName)
        }
      }
    ]
    inquirer.prompt(dirName)
    .then(function (answers) {
      if (answers) {
        helpers.addTo(cache, answers)
        resolve(cache)
      }
    })
  })
}

prompt.templateVersion = function templateVersion (cache) {
  return new Promise(function (resolve, reject) {
    let templateVersion = [
      {
        name: `templateVersion`,
        type: `list`,
        message: text.subtheme.templateVersion,
        choices: [
          {
            name: text.subtheme.templateVersionMaster,
            value: `master`
          },
          {
            name: text.subtheme.templateVersionTag(cache),
            value: `${cache.lastTag}`
          }
        ]
      }
    ]
    inquirer.prompt(templateVersion)
    .then(function (answers) {
      helpers.addTo(cache, answers)
      resolve(cache)
    })
  })
}

prompt.isOk = function isOk (cache, message, fn) {
  return new Promise(function (resolve, reject) {
    let isOk = [
      {
        name: `isOk`,
        type: 'confirm',
        message: message
      }
    ]
    inquirer.prompt(isOk)
    .then(function (answers) {
      if (answers.isOk) {
        resolve(cache)
      } else {
        if (fn) {
          resolve(fn(cache))
        } else {
          process.exit(1)
        }
      }
    })
  })
}
