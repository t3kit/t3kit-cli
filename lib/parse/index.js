'use strict'

const shell = require('shelljs')
const helpers = require('../helpers')
// const variables = require('../variables')
// var fs = require('fs')

const parse = module.exports = {}

// replace string in files
parse.replaceString = function replaceString (cache, oldString, newString) {
  return new Promise(function (resolve) {
    shell.sed('-i', helpers.escapeRegExp(oldString), newString, cache.files)
    resolve(cache)
  })
}

parse.replaceStringInFile = function replaceStringInFile (cache, oldString, newString, file) {
  return new Promise(function (resolve) {
    shell.sed('-i', helpers.escapeRegExp(oldString), newString, file)
    resolve(cache)
  })
}
