'use strict'

const fs = require('fs')
const boxen = require('boxen')
const helpers = require('../helpers')
const variables = require('../variables')

const cmd = module.exports = {}

// mkdir
cmd.mkdir = function mkdir (cache) {
  return new Promise(function (resolve) {
    if (cache.dirName) {
      fs.mkdirSync(cache.dirName)
    } else {
      fs.mkdirSync(variables.subtheme.dirName(cache))
    }
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


// remove file
cmd.rmFile = function rmFile (cache, file) {
  return new Promise(function (resolve) {
    fs.unlinkSync(file)
    resolve(cache)
  })
}

// rename file
cmd.renameFile = function renameFile (cache, oldPath, newPath) {
  return new Promise(function (resolve) {
    fs.renameSync(oldPath, newPath)
    resolve(cache)
  })
}


// rename file
cmd.appendFile = function appendFile (cache, file, message) {
  return new Promise(function (resolve, reject) {
    fs.appendFile(file, message, function (err) {
      if (err) {
        reject(new Error(err))
      }
      resolve(cache)
    })
  })
}

// read dir recursively
cmd.readFilesRecursively = function readFilesRecursively (cache, ...dir) {
  return new Promise(function (resolve) {
    let files = {}
    files.files = []
    let doNotParse = ['png', 'jpg', 'svg']
    let getFilesRecursively = function (path, files) {
      fs.readdirSync(path).forEach(function (file) {
        let subpath = path + '/' + file
        if (fs.lstatSync(subpath).isDirectory()) {
          getFilesRecursively(subpath, files)
        } else {
          if (!doNotParse.includes(file.slice(-3))) {
            files.push(path + '/' + file)
          }
        }
      })
    }
    dir.forEach(function (val) {
      getFilesRecursively(val, files.files)
    })
    // + 1-level files
    fs.readdirSync(helpers.pwd()).forEach(function (file) {
      if (!fs.lstatSync(file).isDirectory()) {
        if (!doNotParse.includes(file.slice(-3))) {
          files.files.push(file)
        }
      }
    })
    helpers.addTo(cache, files)
    resolve(cache)
  })
}
