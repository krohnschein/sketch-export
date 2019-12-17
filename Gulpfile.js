var gulp = require('gulp'),
    sketch = require('gulp-sketch'),
    svgo = require('gulp-svgo'),
    cheerio = require('gulp-cheerio'),
    del = require('del'),
    imageResize = require('gulp-image-resize'),
    svgSprite = require("gulp-svg-sprites"),
    $fill1 = "#EA1B0A",
    $fill = "#39393A",
    $fill2 = "#39393a";
config = {
    mode: {
        view: { // Activate the «view» mode
            bust: false,
            render: {
                scss: true // Activate Sass output (with default options)
            }
        },
        symbol: true // Activate the «symbol» mode
    }
};

gulp.task('svgNoFill', function (complete) {

    del('./output/svg/nofill/')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeAttrs: {
                        attrs: ['stroke', 'fill']
                    }

                }, {
                    removeViewBox: false
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }, {
                    removeStyleElement: true
                }
            ]
        })) //svgo
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                done();
            }
        }))//cheerio
        // .pipe(svgo({
        //     js2svg: {
        //         pretty: true
        //     } //js2svg
        // }))
        .pipe(gulp.dest('./output/svg/nofill/'));
    complete();
});// SVG No fill


gulp.task('svgWhite', function (complete) {

    del('./output/svg/fillWhite/')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeAttrs: {
                        attrs: ['stroke.*', 'fill', 'id', 'class']
                    }

                }, {
                    removeViewBox: false
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }, {
                    removeStyleElement: true
                }
            ]
        })) //svgo
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fill1);
                done();
            }
        }))//cheerio
        // .pipe(svgo({
        //     js2svg: {
        //         pretty: true
        //     } //js2svg
        // }))
        .pipe(gulp.dest('./output/svg/fillWhite/'));
    complete();
});// SVG White

gulp.task('svgDarkgrey', function (complete) {

    del('./output/svg/fillDarkgrey/')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeAttrs: {
                        attrs: ['stroke.*', 'fill', 'id', 'class']
                    }

                }, {
                    removeViewBox: false
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }, {
                    removeStyleElement: true
                }
            ]
        })) //svgo
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fill2);
                done();
            }
        }))//cheerio
        // .pipe(svgo({
        //     js2svg: {
        //         pretty: true
        //     } //js2svg
        // }))
        .pipe(gulp.dest('./output/svg/fillDarkgrey/'));
    complete();
});// SVG White


gulp.task('sketchSVG', function (complete) {

    del('./output/sketch/**/*')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg'
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeViewBox: false
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }
            ]
        })) //svgo
        .pipe(gulp.dest('./output/sketch/'));
    complete();
});// sketch


gulp.task('sprites', function () {
    return gulp.src('./output/svg/fillWhite/32/**/*.svg')
        .pipe(svgSprite(config)).on('error', function (error) {
            console.log(error);
        })
        .pipe(gulp.dest("./output/assets"));
});

gulp.task('png-iphonex', function (complete) {
    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'artboards',
            formats: 'png',
            scales: 4.0
        }))
        .pipe(imageResize({
            width: 1125,
            height: 2436,
            crop: true,
            gravity: "North",
            upscale: false
        }))
        .pipe(gulp.dest('./output/iphonex'));

    complete();
});
gulp.task('png', function (complete) {
    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'png',
            scales: 2.0
        }))
        .pipe(gulp.dest('./output/png'));

    complete();
});


gulp.task('svgAll', function (complete) {

    del('./output/svg/**/*')

    return gulp.src('./input/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'svg',
            maxSize: '4',
        }))
        .pipe(svgo({
            js2svg: {
                pretty: true
            }, //js2svg
            plugins: [

                {
                    removeAttrs: {
                        attrs: ['stroke.*', 'fill', 'id', 'class']
                    }

                }, {
                    removeViewBox: false
                }, {
                    cleanupNumericValues: {
                        floatPrecision: 4
                    }
                },
                {
                    removeTitle: true
                }, {
                    collapseGroups: true
                }, {
                    removeStyleElement: true
                }
            ]
        })) //svgo
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/svg/nofill/'))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fill1);
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/svg/fillWhite/'))
        .pipe(cheerio({
            parserOptions: {xmlMode: true},
            run: ($, file, done) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('path, rect, circle').attr('fill', $fill2);
                done();
            }
        }))//cheerio
        .pipe(gulp.dest('./output/svg/fillDarkgrey/'));

    complete();
});// SVG White
