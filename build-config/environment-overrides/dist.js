const path = require('path')
const projectDirectory = process.env.projectDirectory || process.cwd()
const buildFolder = 'build'

const distOverrideConfig = {
  minify: false,
  source: {
    sw: {
      globDirectory: path.resolve(projectDirectory, buildFolder, 'assets'),
      // Change additional ServiceWorker workbox settigns
      // See https://developers.google.com/web/tools/workbox/modules/workbox-build for all the options
      // globPatterns: ['**/*.{js,css,eot,ttf,woff,json}'],
      // globIgnores: ['**/dev*', '**/tmp*', 'dev*.*', 'tmp*.*'],
      // modifyURLPrefix: {
      //     '': '/path/to/backend/assets/'
      // }
    },
  },
  dest: {
    root: {
      path: './' + buildFolder,
    },
    html: {
      path: '<%= root %>/html',
    },
    assets: {
      path: '<%= root %>/assets',
    },
    sw: {
      path: '<%= root %>',
    },
  },
}

module.exports = distOverrideConfig
