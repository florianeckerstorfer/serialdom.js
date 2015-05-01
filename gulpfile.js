var gulp        = require('gulp'),
    concat      = require('gulp-concat')
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

var scripts = [
    './src/module-pre.js',
    './src/serialdom.js',
    './src/module-post.js'
];

gulp.task('default', ['build']);
gulp.task('build', ['js-build']);
gulp.task('dist', ['js-dist']);

gulp.task('js-dist', function () {
    gulp.src(scripts)
        .pipe(concat('serialdom.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(concat('serialdom.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('js-build', function () {
    gulp.src(scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('serialdom.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'));
});

gulp.task('serve', function() {
    browserSync({server: {baseDir: "./"}});

    gulp.watch("src/*.js", ['js-build', reload])
    gulp.watch("*.html").on('change', reload);
});

