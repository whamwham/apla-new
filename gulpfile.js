var gulp = require('gulp');
var browserSync = require('browser-sync').create({tunnel:true});
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var cssmin = require('gulp-clean-css');
var browserify = require('browserify');
var babel = require('babelify');
var vinylSourceStream = require('vinyl-source-stream');
var es = require('event-stream');
var $ = require('gulp-load-plugins')();
var pugI18n = require('gulp-pug-i18n');

const imagemin = require('gulp-imagemin');

var gulp = require('gulp');
var sitemap = require('gulp-sitemap');


var postcssPlugins = [
    autoprefixer({
        browsers: ['last 2 versions']
    })/*,
    cssnano({
        zindex: false,
        reduceIdents: false,
        discardUnused: false,
        mergeIdents: false
    })*/
];



gulp.task('copy-favicons', function () {
  gulp.src('src/favicons/*')
    .pipe($.newer('dist/favicons'))
    .pipe(gulp.dest('dist/favicons'));
});


gulp.task('copy-fonts', function () {
    gulp.src('src/fonts/*')
        .pipe($.newer('dist/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});


gulp.task('copy-files', function () {
    gulp.src('src/download/**/*')
        .pipe($.newer('dist/download'))
        .pipe(gulp.dest('dist/download'));
    gulp.src('src/assets/**/*')
        .pipe($.newer('dist/assets'))
        .pipe(gulp.dest('dist/assets'));
    gulp.src('src/post/**/*')
        .pipe($.newer('dist/post'))
        .pipe(gulp.dest('dist/post'));
});


gulp.task('serve', ['sass', 'jade', 'browserify'], function () {
//    gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server:{
        baseDir: "./dist"
    },
    port:3300
  //, tunnel:true
  });

  gulp.watch('src/pug/**/*.pug', ['jade']);
  gulp.watch(['src/sass/**/*.sass', 'src/sass/**/*.scss'], ['sass']);
  gulp.watch(['src/images/**/*','src/assets/images/**/*','src/assets/icons/**/*', '!src/images/svg/icons/**/*'], ['images']);
  gulp.watch('src/js/**/*', ['browserify']);
});

gulp.task('jade2', function () {
    return gulp.src(['src/pug/**/*.pug', '!src/pug/includes/*.pug'])
        .pipe($.pug({
            pretty: "    ",
            basedir: "./src"
        }).on('error', $.notify.onError({
            title: "Jade Error",
            message: "<%= error.message %>"
        })))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('jade', function () {
    var options = {
        i18n: {
            dest: 'dist',
            locales: 'src/pug/locale/*.*',
            default: "en",
            filename: '{{{lang}}}/{{basename}}.html'
        },
        basedir: "./src",
        pretty: true
    };
    return gulp.src(['src/pug/**/*.pug', '!src/pug/includes/*.pug', '!src/pug/locale/*'])
        .pipe(pugI18n(options))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('sass-build', function () {
  gulp.src(['src/sass/**/*.sass', 'src/sass/**/*.scss'])
    .pipe($.sass()
      .on('error', $.notify.onError({
        title: "Sass Error",
        message: "<%= error.message %>"
      })))
    .pipe($.rename({
      suffix: ".min"
    }))
    .pipe($.postcss(postcssPlugins))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  gulp.src(['src/sass/**/*.sass', 'src/sass/**/*.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.sass()
      .on('error', $.notify.onError({
        title: "Sass Error",
        message: "<%= error.message %>"
      })))
    .pipe($.rename({
      suffix: ".min"
    }))
    .pipe($.postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(cssmin({inline: ['all']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});


var inlineCss = require('gulp-inline-css');

gulp.task('icss', function() {
    return gulp.src('dist/blocked*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('dist/'));
});


gulp.task('images', function () {
    gulp.src('src/images/**/*')
        .pipe($.newer('dist/images'))
        .pipe($.imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('dist/images'));

    gulp.src('src/assets/images/**/*')
        .pipe($.newer('dist/assets/images'))
        .pipe($.imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('dist/assets/images'));

    return gulp.src('src/assets/icons/**/*')
        .pipe($.newer('dist/assets/icons'))
        .pipe($.imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('dist/assets/icons'));
});


gulp.task('uglify', ['browserify'], function () {
  return gulp.src('dist/js/*.js')
    .pipe($.uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('dist/js'));
});


//gulp.task('browserify', ['lint'], function () {
gulp.task('browserify', function () {
  var files = [
    'main.js'
  ];
  var tasks = files.map(function (entry) {
    return browserify({
      entries: ['src/js/' + entry],
      debug: false
    })
      .transform(babel)
      .bundle()
      .on('error', $.notify.onError({
        title: "Scripts Error",
        message: "<%= error.message %>"
      }))
      .pipe(vinylSourceStream(entry))
      .pipe($.rename({
        extname: '.bundle.js'
      }))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream({once: true}));
  });
  return es.merge.apply(null, tasks);
});

gulp.task('lint', () => {
  return gulp.src('src/js/**/*')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});


gulp.task('sitemap', function () {
    gulp.src(['dist/**/*.html','!dist/assets/**/*.*','!dist/includes/**/*.*'], {
        read: false
    })
        .pipe(sitemap({
            siteUrl: 'https://apla.io/'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['jade', 'sitemap', 'sass-build', 'uglify', 'copy-favicons', 'copy-fonts', 'copy-files']);
gulp.task('default', ['serve']);
