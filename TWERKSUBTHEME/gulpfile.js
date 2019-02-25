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
var cleancss = require('gulp-clean-css');
var stylelint = require('gulp-stylelint');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

/**
 * @task js
 * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
 * UglifyJS is a JavaScript parser, minifier, compressor and beautifier toolkit.
 */
gulp.task('js', function() {
  return gulp.src('js/**/*.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(sourcemaps.init())
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});


/**
 * @task svgstore
 * Combine svg files into one with <symbol> elements
 */
gulp.task('svgstore', function () {
  var svgs = gulp
  .src(['icons/*.svg'])
  .pipe(svgmin({
    plugins: [
      {removeDesc: true},
      {cleanupIDs: true},
      {mergePaths: false}
    ]
  }))
  .pipe(rename({prefix: 'icon-'}))
  .pipe(svgstore({inlineSvg: true}))
  .pipe(gulp.dest('dist'));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src('icons/icons.html')
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest('dist'));
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
    .pipe(plumber())
    .pipe(stylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
    .pipe(sourcemaps.init())
    .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});


/**
 * @task clean
 * Clean the dist folder.
 */
gulp.task('clean', function () {
  return del(['dist/css/*', 'dist/js/*', 'dist/*']);
});


/**
 * @task watch
 * Watch files and do stuff.
 */
gulp.task('watch', gulp.series('clean', gulp.parallel('svgstore', 'css', 'js'), function () {
  gulp.watch('icons/**/*.svg', gulp.task('svgstore'));
  gulp.watch('sass/**/*.+(scss|sass)', gulp.task('css'));
  gulp.watch('js/**/*.js', gulp.task('js'));
}));


/**
 * @task build
 * Compiles stuff.
 */
gulp.task('build', gulp.series('clean', gulp.parallel('svgstore', 'css', 'js')));


/**
 * @task default
 * Watch files and do stuff.
 */
gulp.task('default', gulp.task('watch'));
