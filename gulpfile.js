// Require all the things
const gulp        = require('gulp'),
      browserSync = require('browser-sync'),
      sass        = require('gulp-sass'),
      gutil       = require('gulp-util'),
      rename      = require('gulp-rename'),
      minifyCSS   = require('gulp-minify-css'),
      uglify      = require('gulp-uglify'),
      imagemin    = require('gulp-imagemin'),
      prefixer    = require('gulp-autoprefixer'),
      plumber     = require('gulp-plumber'),
      cp          = require('child_process');


// Set the path variables
const base_path = './',
      src = base_path + '_dev',
      dist = base_path + 'assets',
      paths = {
          js: src + '/js/*.js',
          scss: [ src +'/scss/*.scss',
                  src +'/scss/**/*.scss',
                  src +'/scss/**/**/*.scss'],
          images: [ src + '/assets/*',
                    src + '/images/*'],
          fonts: [ src + '/fonts/*'],
          jekyll: ['index.html', '_projects/*', '_layouts/*', '_includes/*' , 'assets/*', 'assets/**/*']
      };


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


// Build the Jekyll Site
gulp.task('jekyll-build', function (code) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
      .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
      .on('close', code);
});


// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['compile-sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});


// Compile sass to css
gulp.task('compile-sass', () => {
  return gulp.src(paths.scss)
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message));
      gulp.task('compile-sass').emit('end');
    }))
    .pipe(sass())
    .pipe(prefixer('last 10 versions', 'ie 9'))
    .pipe(minifyCSS())
    .pipe(rename({dirname: dist + '/css'}))
    .pipe(gulp.dest('./'));
});


// Uglify JS
gulp.task('uglify-js', function () {
  // returns a Node.js stream, but no handling of error messages
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({dirname: dist + '/js'}))
    .pipe(gulp.dest('./'));
});


// Compress images
gulp.task('imagemin', function () {
	return gulp.src(paths.images)
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message));
      gulp.task('imagemin').emit('end');
    }))
		.pipe(imagemin())
    .pipe(rename({dirname: dist + '/images'}))
    .pipe(gulp.dest('./'));
});


// Copy font files
gulp.task('copy-fonts', function () {
     gulp
      .src(paths.fonts)
      .pipe(rename({dirname: dist + '/fonts'}))
      .pipe(gulp.dest('./'));
});


// Watch files
gulp.task('watch', () => {
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});


// Start Everything with the default task
gulp.task('default', ['browser-sync', 'watch']);
