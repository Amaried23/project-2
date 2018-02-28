'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps')

var config = {
  materializeSrc: './bower_components/materialize',
  bowerDir: './bower_components',
  jsFiles: 'app/src/assets/js/**/*.js',
  jsDest: 'app/public/assets/js/',
  sassFiles: 'app/src/assets/css/**/*.scss',
  sassDest: 'app/public/assets/css'
}

livereload({ start: true });

gulp.task('bower', function() {
  return bower()
      .pipe(gulp.dest(config.bowerDir))
});

gulp.task('sass', function () {
  gulp.src(config.sassFiles)
    .pipe(sass({
      includePaths: [config.materializeSrc + '/sass/'],
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.sassDest))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  return gulp.src(config.jsFiles)
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(config.jsDest))
      .pipe(rename('scripts.min.js'))
      .pipe(sourcemaps.write())
      .pipe(uglify())
      .pipe(gulp.dest(config.jsDest));
})

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(config.sassFiles, ['sass']);
  gulp.watch(config.jsFiles, ['scripts']);
});

gulp.task('default', ['bower', 'watch']);