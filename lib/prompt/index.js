'use strict'

const inquirer = require('inquirer')
const helpers = require('../helpers')
// const chalk = require('chalk')
// var fs = require('fs')
const labels = require('../labels')

const prompt = module.exports = {}

// ask about project type
prompt.whatToDo = function whatToDo (cache) {
  return new Promise(function (resolve, reject) {
    let whatToDo = [
      {
        name: 'whatToDo',
        type: 'list',
        message: 'Select variants:',
        choices: [
          {
            name: `${labels.subtheme.description}`,
            value: `subtheme`
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
      if (answers) {
        helpers.addTo(cache, answers)
        resolve(cache)
      } else {
        reject(Error(`in prompt.whatToDo fn`))
      }
    })
  })
}
