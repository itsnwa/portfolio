// Require all the things
var   gulp         = require('gulp'),
      browserSync  = require('browser-sync'),
      sass         = require('gulp-sass'),
      gutil        = require('gulp-util'),
      rename       = require('gulp-rename'),
      postcss      = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano      = require('gulp-cssnano'),
      sourcemaps   = require('gulp-sourcemaps'),
      uglify       = require('gulp-uglify'),
      imagemin     = require('gulp-imagemin'),
      plumber      = require('gulp-plumber'),
      del          = require('del'),
      cp           = require('child_process');


// Set the path variables
var   base_path = './',
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
gulp.task('browser-sync', ['css', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        port: 3000,
        notify: {
          styles: {
            top: '30px',
            left: '50%',
            width: '200px',
            transform: 'translate(-50%,-50%)',
            margin: '0px',
            padding: '8px 12px',
            position: 'fixed',
            fontSize: '13px',
            fontFamily: 'Helvetica',
            zIndex: '9999',
            borderRadius: '16px',
            color: 'white',
            textAlign: 'center',
            display: 'block',
            backgroundColor: 'rgba(0,0,0, 0.8)'
          }
        },
        logLevel: 'silent'
    });

    // Some fancy console art
    console.clear();
    console.log('Starting DevelopmentServer');
    console.log('           ');
    console.log('           ');
    console.log('    /   /  _  / \\     NWA');
    console.log('   / \\ / \\/ \\/ - \\    Local Development Environment');
    console.log('           ');
    console.log('           ');
    console.log('Listening on port 3000');
    console.log('           ');
    console.log('           ');

});


// CSS Process
gulp.task('css', () => {
  return gulp.src(paths.scss)
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message));
      gulp.task('compile-sass').emit('end');
    }))
    .pipe(sourcemaps.init() )
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
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


// Clean build folders
gulp.task('clean', function () {
  return del([
    '_site',
    'assets'
  ]);
});


// Build site
gulp.task('prod', ['css', 'jekyll-build', 'copy-fonts', 'imagemin', 'uglify-js'])


// Watch files
gulp.task('watch', () => {
  gulp.watch(paths.scss, ['css']);
  gulp.watch(paths.js, ['uglify-js']);
  gulp.watch(paths.images, ['imagemin']);
  gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});


// Start Everything with the default task
gulp.task('default', ['browser-sync', 'watch']);
