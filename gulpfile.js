// Require all the things
const gulp        = require('gulp'),
      browserSync = require('browser-sync').create(),
      sass        = require('gulp-sass'),
      gutil       = require('gulp-util'),
      plumber     = require('gulp-plumber'),
      rename      = require('gulp-rename'),
      minifyCSS   = require('gulp-minify-css'),
      uglify      = require('gulp-uglify'),
      imagemin    = require('gulp-imagemin'),
      prefixer    = require('gulp-autoprefixer'),
      connect     = require('gulp-connect');
      cp          = require('child_process');
      ghPages     = require('gulp-gh-pages');

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


// Compile sass to css
gulp.task('compile-sass', () => {
  return gulp.src(paths.scss)
    .pipe(plumber((error) => {
        gutil.log(gutil.colors.red(error.message));
        gulp.task('compile-sass').emit('end');
    }))
    .pipe(sass())
    .pipe(prefixer('last 3 versions', 'ie 9'))
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
gulp.task('imagemin', () =>
	gulp.src(paths.images)
		.pipe(imagemin())
    .pipe(rename({dirname: dist + '/images'}))
    .pipe(gulp.dest('./'))
);

// Copy font files
gulp.task('copy-fonts', function () {
     gulp
      .src(paths.fonts)
      .pipe(rename({dirname: dist + '/fonts'}))
      .pipe(gulp.dest('./'));
});

// Deploy to Github Pages
gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages());
});

// Rebuild Jekyll
gulp.task('build-jekyll', (code) => {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', code);
})

// Setup Server
gulp.task('server', () => {
  connect.server({
    root: ['_site'],
    port: 4000
  });
})

// Watch files
gulp.task('watch', () => {
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.jekyll, ['build-jekyll']);
});

// Start Everything with the default task
gulp.task('default', [ 'compile-sass', 'uglify-js', 'imagemin', 'copy-fonts', 'build-jekyll', 'server', 'watch' ]);
