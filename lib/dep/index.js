'use strict'

const helpers = require('../helpers')

const dep = module.exports = {}

// ========================================
// all dependencies here
// ========================================

// Instal npm dependencies
dep.npmInstall = function npmInstall (cache) {
  let cmd = {
    spinner: 'Instaling npm dependencies',
    str: 'npm install'
    // spinerSucceed: ''
  }
  return helpers.execCMD(cmd, cache)
}
