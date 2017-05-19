'use strict'

const _ = require('lodash')
const chalk = require('chalk')

const Ora = require('ora')
const spinner = new Ora()
const exec = require('child_process').exec

const helpers = module.exports = {}

helpers.addTo = function stats (cache, val) {
  if (val) {
    _.assign(cache, val)
  } else {
    console.log(Error('in helpers.addTo'))
  }
}

helpers.promiseChainStarter = function promiseChainStarter (val) {
  return new Promise(function (resolve) {
    resolve(val)
  })
}

helpers.error = function stats (err) {
  let divider = '==========================================\n'
  return console.log(divider + chalk.red(err.stack))
}

helpers.random = function random () {
  return Math.floor((Math.random() * 1000000) + 1)
}

helpers.escapeRegExp = function escapeRegExp (string) {
  return string.replace(/([.*+?^${}()|[\]/\\])/g, '\\$1')
}

helpers.pwd = function pwd () {
  return process.cwd()
}

helpers.appName = function appName () {
  let pkgV = require(`${process.cwd()}/package.json`)
  return pkgV.name
}

helpers.execCMD = function execCMD (cmd, cache) {
  return new Promise(function (resolve, reject) {
    if (cmd.spinner) {
      spinner.text = cmd.spinner
      spinner.start()
    }
    exec(cmd.str, { maxBuffer: 2000 * 1024 }, (error) => {
      if (error) {
        if (cmd.spinner) {
          spinner.fail(`[${cmd.str}] -> error`)
        }
        reject(new Error(error))
      } else {
        if (cmd.spinner) {
          cmd.spinerSucceed ? spinner.succeed(cmd.spinerSucceed) : spinner.succeed()
        }
        resolve(cache)
      }
    })
  })
}
