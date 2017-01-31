// require
var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');
var connect = require('gulp-connect-php');
var ts = require("gulp-typescript");
var coffee = require('gulp-coffee');

var paths = {
    cssdest: "app/css",

    sassinput: "source/scss/**/*.scss",
    sassdest: "app/css/scss",

    lessinput: "source/less/**/*.less",
    lessdest: "app/css/less",

    tsinput: "source/typescript/**/*.ts",
    tsdest: "app/javascript/typescript",

    coffeeinput: "source/coffeescript/**/*.coffee",
    coffeedest: "app/javascript/coffeescript",
};

// typescript config
var tsProject = ts.createProject("tsconfig.json");
// typescript
gulp.task('typescript', function(){
    var tsResult = gulp.src(paths.tsinput)
        .pipe(tsProject());
        
    return tsResult.js
        .pipe(gulp.dest(paths.tsdest));
});

// coffeescript
gulp.task('coffee', function() {
    return gulp.src(paths.coffeeinput)
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest(paths.coffeedest));
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

// css autoprefixer
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'Firefox ESR', 'Firefox >= 3', 'Opera >= 10', 'IE >= 8', 'Chrome >= 4', 'Safari >= 4', 'iOS >= 2']
};

// less
gulp.task('less', function() {
    return gulp.src(paths.lessinput)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.lessdest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// sass output
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
// sass
gulp.task('sass', function() {
    return gulp.src(paths.sassinput)
        .pipe(sass())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.sassdest))
        .pipe(browserSync.reload({
            stream: true
        }))
        .resume();
});
