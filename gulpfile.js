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
var imagemin = require('gulp-imagemin');
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

// haml
gulp.task('haml', function () {
  gulp.src(paths.hamlinput)
    .pipe(haml({ext: '.php'}))
    //.pipe(gulp.dest(paths.hamldest));
    .pipe(gulp.dest("app/php"));
});

// typescript config
var tsproject = ts.createProject("tsconfig.json");
// typescript
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

// css autoprefixer
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
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

// sass output
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
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

// optimize images
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('app/images'));
});