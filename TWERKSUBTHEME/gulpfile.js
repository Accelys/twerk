/**
 * @file
 * Gulpfile for fortytwo.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var autoprefixer = require('autoprefixer');


/**
 * @task eslint
 * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
 * abort calling task on error
 */
// @TODO change js task (from fortytwo) to use eslint instead of jscs
/**
 * @task js
 *
 */
gulp.task('js', function () {
  var stream = gulp.src(['static/js/**/*.js'])
  .pipe($.jscs({fix: true}))
  .pipe($.jscs.reporter())
  .pipe(gulp.dest('./static/js'))
  .on('error', $.util.log);

  if (config.enable_livereload) {
    stream.pipe($.livereload());
  }

  return stream;
});




/**
 * @task sass-lint
 * Lint sass, abort calling task on error
 */
// @TODO change sass-lint task (from fortytwo) to a `stylelint` task
gulp.task('sass-lint', function () {
  return gulp.src('sass/**/*.s+(a|c)ss')
  .pipe($.sassLint({configFile: '.sass-lint.yml'}))
  .pipe($.sassLint.format())
  .pipe($.sassLint.failOnError());
});

gulp.task('sass-compile', ['sass-lint'], function () {
  // postCss plugins and processes
  var pcPlug = {
    autoprefixer: require('autoprefixer'),
  };
  var pcProcess = [
    // Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use website
    pcPlug.autoprefixer({
      browsers: ['> 5%', 'last 2 versions', 'safari 8', 'IE 10', 'IE 11']
    }),
    // Pack same CSS media query rules into one using PostCSS
    pcPlug.mqpacker()
  ];

  return gulp.src('sass/**/*.s+(a|c)ss') // Gets all files ending
  .pipe($.sass())
  .on('error', function (err) {
    console.log(err);
    this.emit('end');
  })
  .pipe($.sourcemaps.init())
  .pipe($.postcss(pcProcess))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest('dist/css'))
  .on('error', $.util.log);
});

/**
 * @task clean
 * Clean the dist folder.
 */
gulp.task('clean', function () {
  return del(['dist/css/*']);
});

/**
 * @task watch
 * Watch files and do stuff.
 */
gulp.task('watch', ['clean', 'sass-compile'], function () {
  gulp.watch('sass/**/*.+(scss|sass)', ['sass-compile']);
});

/**
 * @task default
 * Watch files and do stuff.
 */
gulp.task('default', ['watch']);
