// require
var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var connect = require('gulp-connect-php');
var ts = require("gulp-typescript");
var haml = require('gulp-haml');

var paths = {
    cssdest: "app/css",

    sassinput: "app/source/scss/**/*.scss",
    sassdest: "app/css/scss",

    lessinput: "app/source/less/**/*.less",
    lessdest: "app/css/less",

    tsinput: "app/source/typescript/**/*.ts",
    tsdest: "app/javascript/typescript",
    
    hamlinput: "app/source/haml/**/*.haml",
    hamldest: "app"
};

gulp.task('haml', function () {
  gulp.src(paths.hamlinput)
    .pipe(haml({ext: '.php'}))
    //.pipe(gulp.dest(paths.hamldest));
    .pipe(gulp.dest("app/php"));
});

var tsproject = ts.createProject("tsconfig.json");
gulp.task('typescript', function(){
    return gulp.src(paths.tsinput)
        .pipe(ts(tsproject))
        .js.pipe(gulp.dest(paths.tsdest));
});

// dev connection
gulp.task('connect', function() {
    connect.server({ base: 'app', port: 8010, keepalive: true});
});

// dev browserSync
gulp.task('browserSync', ['connect'], function() {
    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: false,
        notify: false
    });
});

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

// less
gulp.task('less', function() {
    gulp.src(paths.lessinput)
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.lessdest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// sass
gulp.task('sass', function() {
    return gulp.src(paths.sassinput)
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.sassdest))
        .pipe(browserSync.reload({
            stream: true
        }))
        .resume();
});

gulp.task('useref', function() {
    return gulp.src(['app/**/*.php', 'app/.htaccess', 'app/web.config'])
        .pipe(useref({ searchPath: 'app/' }))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('app'));
});

// optimize images
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('app/images'));
});

// clean project
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
});

// clear cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback);
});

// watch file changes
gulp.task('watch', ['browserSync', 'haml', 'sass', 'less', 'typescript'], function () {
    gulp.watch(paths.sassinput, ['sass']);
    gulp.watch(paths.lessinput, ['less']);
    gulp.watch(paths.tsinput, ['typescript']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/**/*.php', browserSync.reload);
    gulp.watch('app/javascript/**/*.js', browserSync.reload);
});

// default gulp | starts dev web server
gulp.task('default', function (callback) {
    runSequence(['haml', 'sass', 'less', 'app-views', 'typescript', 'browserSync', 'watch'], callback);
});

gulp.task('prod', function () {
    return gulp
        .src(paths.sassinput)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions));
});