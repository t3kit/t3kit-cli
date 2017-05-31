'use strict'

const _ = require('lodash')
const variables = require('../variables')
const helpers = require('../helpers')
const exec = require('child_process').exec

const git = module.exports = {}

// clone mobileApp_template
git.clone = function clone (cache, link) {
  let cmd = {
    spinner: `Cloning subtheme ${cache.whatToDo}`,
    str: `git clone --single-branch -b master ${link} ${cache.dirName || variables.subtheme.dirName(cache)}`,
    spinerSucceed: `${cache.whatToDo} template successfully cloned`
  }
  return helpers.execCMD(cmd, cache)
}

// remove previous git repo
git.removeRepo = function removeRepo (cache) {
  let cmd = {
    // spinner: '',
    str: `rm -rf .git`
    // spinerSucceed: ''
  }
  return helpers.execCMD(cmd, cache)
}

// git add
git.init = function init (cache) {
  let cmd = {
    // spinner: '',
    str: `git init`
    // spinerSucceed: ''
  }
  return helpers.execCMD(cmd, cache)
}

// git add
git.add = function add (cache) {
  let cmd = {
    // spinner: '',
    str: `git add .`
    // spinerSucceed: ''
  }
  return helpers.execCMD(cmd, cache)
}

// git commit
git.commit = function commit (cache, commitMessage) {
  let cmd = {
    // spinner: '',
    str: `git commit -m "${commitMessage}"`
    // spinerSucceed: ''
  }
  return helpers.execCMD(cmd, cache)
}

// git checkout
git.checkout = function checkout (cache) {
  let cmd = {
    str: `git checkout ${cache.templateVersion}`
  }
  return helpers.execCMD(cmd, cache)
}


git.getLastTag = function getLastTag (cache) {
  return new Promise(function (resolve, reject) {
    let str = 'git describe --abbrev=0 --tags'
    let lastTag = {}
    exec(str, { maxBuffer: 2000 * 1024 }, (error, stdout) => {
      if (error) {
        reject(new Error(error))
      } else {
        if (_.isEmpty(stdout)) {
          lastTag = { lastTag: false }
        } else {
          var match = stdout.match(/\n/i)
          lastTag = stdout.slice(0, match.index)
          lastTag = { lastTag: lastTag }
        }
        helpers.addTo(cache, lastTag)
        resolve(cache)
      }
    })
  })
}
