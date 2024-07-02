"use strict"

const {src, dest} = require("gulp");
const gulp = require('gulp');

const removeComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
// const cssNano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const panini = require('panini');
const imagemin = require('gulp-imagemin');
const del = require('del');
const rigger = require('gulp-rigger');
const {stream} = require("browser-sync");
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const srcPath = 'src/';
const distPath = 'dist/'

const path = {
    build: {
        html:   distPath,
        css:    distPath + 'assets/css/',
        icons:  distPath + 'assets/icons/',
        images: distPath + 'assets/images/',
        js:     distPath + 'assets/js/',
        fonts:  distPath + 'assets/fonts/',
        jsLibs: distPath + 'assets/js/libs/',
    },
    src: {
        html:   srcPath + '*.html',
        css:    srcPath + 'assets/scss/*.scss',
        js:     srcPath + 'assets/js/*.js',
        jsLibs: srcPath + 'assets/js/libs/*.js',
        icons:  srcPath + 'assets/icons/*.svg',
        images: srcPath + 'assets/images/**/*.{jpeg,png,svg,jpg,gif,ico,webp,webmanifest,xml}',
        fonts:  srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}'
    },
    watch: {
        html:   srcPath + '**/*.html',
        css:    srcPath + 'assets/scss/*.scss',
        js:     srcPath + 'assets/js/*.js',
        jslibs: srcPath + 'assets/js/libs/*.js',
        icons:  srcPath + 'assets/icons/*.svg',
        images: srcPath + 'assets/images/**/*.{jpg,jpeg,png,svg,gif,webp,ico,xml,json,webmanifest}',
        fonts:  srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}'
    },
    clean: './' + distPath
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

function html() {
    return src(path.src.html, {base: srcPath})
        .pipe(plumber())
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream:true}))
}

// CSS

function css() {
    return src(path.src.css, {base: srcPath + 'assets/scss/'})
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "SCSS Error",
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err);
                this.emit('end')
            }
        }
        ))
        .pipe(sass())
        // .pipe(cssNano({
        //     zindex: false,
        //     discardComments: {
        //         removeAll: true
        //     },
        // }))
        .pipe(removeComments())
        .pipe(rename({
            extname: '.css',
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream:true}))
}


// JS

function js() {
    return src(path.src.js, {base: srcPath + 'assets/js/'})
    .pipe(plumber({
        errorHandler: function(err) {
            notify.onError({
                title: "JS Error",
                message: 'Error: <%= error.message %>',
            })(err);
            this.emit('end')
        }
    }
    ))
        .pipe(rigger())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
            extname: '.js',
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream:true}))
}

function jsLibs() {
    return src(path.src.jsLibs, {base: srcPath + 'assets/js/libs/'})
    .pipe(dest(path.build.jsLibs))
    .pipe(browserSync.reload({stream:true}))
}

// IMAGES

function images() {
    return src(path.src.images, {base: srcPath + 'assets/images/'})
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({stream:true}))
}

// CLEAN

function clean() {
    return del(path.clean)
}

function fonts() {
    return src(path.src.fonts, {base: srcPath + 'assets/font/'})
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({stream:true}))
}

function watchFiles(){
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.jslibs], js)
    gulp.watch([path.watch.fonts], fonts)
    gulp.watch([path.watch.images], images)
}

const build = gulp.series(
    clean, 
    gulp.parallel(
        html,
        css,
        js,
        jsLibs,
        fonts,
        images
    )
)

const watch = gulp.parallel(build, watchFiles, server)

exports.html = html
exports.css = css
exports.js = js
exports.fonts = fonts
exports.watch = watch
exports.build = build
exports.default = watch
exports.clean = clean
exports.images = images
exports.jsLibs = jsLibs