/**
 * @file
 * Gulpfile for fortytwo.
 */

var autoprefixer = require('autoprefixer');
var cssMqpacker = require('css-mqpacker');
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var stylelint = require('gulp-stylelint');

/**
 * @task js
 * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
 * UglifyJS is a JavaScript parser, minifier, compressor and beautifier toolkit.
 */
 gulp.task('js', function() {
   return gulp.src('js/**/*.js')
     .pipe(eslint())
     .pipe(eslint.format())
     .pipe(eslint.failOnError())
     .pipe(sourcemaps.init())
       .pipe(uglify())
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('dist/js'));
 });


/**
 * @task css
 * Sass lint + Sass compilation to CSS + add vendor prefixes + minify (refactor media queries + uglify)
 */
gulp.task('css', function () {
  var plugins = [
    autoprefixer({browsers: ['> 5%', 'last 2 versions', 'safari 8', 'IE 10', 'IE 11']}),
    cssMqpacker()
  ];
  return gulp.src('sass/**/*.s+(a|c)ss')
    .pipe(stylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/css'));
});


/**
 * @task clean
 * Clean the dist folder.
 */
gulp.task('clean', function () {
  return del(['dist/css/*', 'dist/js/*']);
});

/**
 * @task default
 * Watch files and do stuff.
 */
gulp.task('default', gulp.series('clean', gulp.parallel('css', 'js'), function () {
  gulp.watch('sass/**/*.+(scss|sass)', gulp.parallel('css'));
  gulp.watch('js/**/*.js', gulp.parallel('js'));
}));
