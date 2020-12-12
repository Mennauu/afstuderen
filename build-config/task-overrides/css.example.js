const requireCached = require(`tamtam-frontend-builder/gulpfile.js/src/gulp/require-cached`)

const config = require('tamtam-frontend-builder/gulpfile.js/config')
const log = require('tamtam-frontend-builder/gulpfile.js/src/debug/log')
const path = require('path')

const gulp = requireCached('gulp')
const browserSync = requireCached('browser-sync')
const sass = requireCached('gulp-sass')
const sourcemaps = requireCached('gulp-sourcemaps')
const autoprefixer = requireCached('gulp-autoprefixer')
const gulpIf = requireCached('gulp-if')
const gulpCleanCss = requireCached('gulp-clean-css')
const gulpSize = requireCached('gulp-size')
const uncss = requireCached('gulp-uncss')
const gulpGroupCSSMediaQUeries = requireCached('gulp-group-css-media-queries')

/**
 * Task for compiled SASS files back to CSS, uses lib-sass instead of ruby for faster compiling.
 * Depending on the settings it will also remove unused CSS lines, add source maps and minify the output.
 *
 * @see https://www.npmjs.com/package/gulp-sass
 * @see http://libsass.org/
 * @see: https://github.com/sindresorhus/gulp-size
 */
function css() {
  const options = {
    sass: {
      // indentedSyntax: true,     // Enable .sass syntax!
      // imagePath: 'images'       // Used by the image-url helper
      errLogToConsole: false,
    },

    // Plugin to parse CSS and add vendor prefixes using values from Can I Use.
    // @see: http://caniuse.com/
    // @see: https://github.com/postcss/autoprefixer-core
    autoprefixer: {
      overrideBrowserslist: ['iOS 8', 'IE 11'],
      grid: true,
      remove: true, // By default, Autoprefixer will not only add new prefixes, but also remove outdated ones.
    },

    // Clean CSS is responsible for minifying the CSS
    // @see: https://github.com/jakubpawlowicz/clean-css
    minify: config.minify,
    cleanCSS: {
      specialComments: 0, // * for keeping all (default), 1 for keeping first one only, 0 for removing all
      mediaMerging: true, // whether to merge @media blocks (default is true)
      inline: ['all'], // Inline all @imports, also external urls
      rebase: false, // set to false to skip URL rebasing
    },

    // UnCSS crawls the HTML and removes any unused CSS selectors and styling.
    // it uses PhantomJS to try to run JavaScript files.
    // @see: https://github.com/giakki/uncss
    removeUnused: config.cleanCSS,
    uncss: {
      html: [config.dest.getPath('html', '*.html')],
      // Provide a list of selectors that should not be removed by UnCSS. For example, styles added by user interaction with the page (hover, click),
      // Both literal names and regex patterns are recognized.
      ignore: [/\.modal.*/, /\.panel.*/, /\.popup.*/, /.*\.is-.*/, /.*\.has-.*/],
      //timeout: 0 //  Specify how long to wait for the JS to be loaded.
    },
    groupCSSMediaQueries: config.groupCSSMediaQueries,
  }

  // Keep track of the file size changes
  const sizeBefore = gulpSize({ showFiles: true })
  const sizeAfter = gulpSize({ showFiles: true })

  return (
    gulp
      .src(config.source.getFileGlobs('css'))

      .pipe(gulpIf(config.sourcemaps, sourcemaps.init()))
      // sass
      .pipe(sass(options.sass))
      // start optimizing...
      .pipe(gulpIf(options.minify, sizeBefore))
      .pipe(gulpIf(options.removeUnused, uncss(options.uncss)))
      .pipe(gulpIf(options.groupCSSMediaQueries, gulpGroupCSSMediaQUeries()))
      .pipe(gulpIf(options.minify, gulpCleanCss(options.cleanCSS)))
      .pipe(autoprefixer(options.autoprefixer))

      // sourcemaps need a relative path from the output folder
      .pipe(gulpIf(config.sourcemaps, sourcemaps.write('.')))

      .pipe(gulp.dest(path.resolve(config.projectDirectory, config.dest.getPath('css'))))

      .pipe(gulpIf(options.minify, sizeAfter))
      .on(
        'end',
        log.size({
          sender: 'sass',
          message: 'css - ',
          size: sizeBefore,
          sizeAfter: sizeAfter,
          wrap: true,
          check: options.minify,
        }),
      )
      .pipe(browserSync.stream({ match: '**/*.css' }))
  )
}

module.exports = {
  css,
}
