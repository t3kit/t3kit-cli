'use strict'

const variables = module.exports = {}

variables.env = {
  node: '6.10'
}

variables.subtheme = {
  repo: `https://github.com/t3kit/subtheme_t3kit_template.git`,
  readmeLabel: (cache) => `**Built on [subtheme_t3kit_template](https://github.com/t3kit/subtheme_t3kit_template) v${cache.lastTag}**`,
  dirName: (cache) => `subtheme_t3kit_${cache.siteName}`
}
