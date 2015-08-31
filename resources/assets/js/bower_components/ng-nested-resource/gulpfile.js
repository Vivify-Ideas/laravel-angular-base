'use strict';

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');


var paths = {
    // ## Source paths
    src: {
        js: ['src/app.js', 'src/**/*.js']
    },

    // ## Production build dest paths
    build: {
        root: 'dist'
    }
};


// ==================================================
// PRODUCTION BUILD TASKS
// ==================================================

// Build production js and place everything into `./dist` folder
gulp.task('build', function () {
    return gulp.src(paths.src.js)
        .pipe(ngAnnotate())
        .pipe(concat('ng-nested-resource.js'))
        .pipe(gulp.dest(paths.build.root))
        .pipe(concat('ng-nested-resource.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.root));
});
