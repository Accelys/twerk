/**
 * @file
 * Gulpfile for fortytwo.
 */

var autoprefixer = require('autoprefixer');
var cssMqpacker = require('css-mqpacker');
var del = require('del');
var eslint = require('eslint');
var eslintConfigAirbnb = require('eslint-config-airbnb');
var gulp = require('gulp');
var gulpPostcss = require('gulp-postcss');
var gulpSass = require('gulp-sass');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpUglify = require('gulp-uglify');
var gulpUglifycss = require('gulp-uglifycss');
var pump = require('pump');
var stylelint = require('stylelint');
var stylelintScss = require('stylelint-scss');

/**
 * @task js-lint
 * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
 * abort calling task on error
 */
 gulp.task('js-lint', function () {
   return gulp.src('js/**/*.js')
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failOnError());
 });

 /**
  * @task js
  * UglifyJS is a JavaScript parser, minifier, compressor and beautifier toolkit.
  */
 gulp.task('js', ['js-lint'], function() {
   return gulp.src('js/**/*.js')
     .pipe(sourcemaps.init())
       .pipe(gulpUglify())
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('dist/js'));
 });


/**
 * @task sass-lint
 * Lint sass, abort calling task on error
 */
// @TODO change sass-lint task (from fortytwo) to a `stylelint` task
gulp.task('sass-lint', function () {
  return gulp.src('sass/**/*.s+(a|c)ss')
  .pipe($.sassLint({configFile: '.sass-lint.yml'})) // @TODO
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
  return del(['dist/css/*', 'dist/js/*']);
});

/**
 * @task watch
 * Watch files and do stuff.
 */
gulp.task('watch', ['clean', 'sass-compile', 'js'], function () {
  gulp.watch('sass/**/*.+(scss|sass)', ['sass-compile']);
  gulp.watch('js/**/*.js', ['js']);
});

/**
 * @task default
 * Watch files and do stuff.
 */
gulp.task('default', ['watch']);
