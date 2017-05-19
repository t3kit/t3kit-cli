'use strict'

var fs = require('fs')
const boxen = require('boxen')

const cmd = module.exports = {}

// mkdir
cmd.mkdir = function mkdir (cache) {
  return new Promise(function (resolve) {
    fs.mkdirSync(cache.dirName)
    resolve(cache)
  })
}

// set working dir
cmd.setWorkDir = function setWorkDir (cache, workDir) {
  return new Promise(function (resolve) {
    process.chdir(workDir)
    resolve(cache)
  })
}

// show message
cmd.showMessage = function showMessage (cache, message) {
  return new Promise(function (resolve) {
    console.log(boxen(message, { padding: 1 }))
    resolve(cache)
  })
}
