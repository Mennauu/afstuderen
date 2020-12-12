/**
 * This will overwrite the default config.copy task.
 * To reference node_modules user: ../module as a path
 */

// const config = require('tamtam-frontend-builder/gulpfile.js/config');

const overrideCopy = [
  // { source: config.source.getPath('assets', '*.*'), dest: config.dest.getPath('assets') },
  // { source: config.source.getPath('assets', 'fonts/**'), dest: config.dest.getPath('fonts') },
  // { source: '../acorn', dest: config.dest.getPath('javascript') }
]

module.exports = overrideCopy
