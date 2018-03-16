var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
/*
    We create a task called sass, and inside of it, we have to tell it the src of these sass files. If you only had 1 sass file, you could omit the array brackets, but we have 2 so we keep them. We first take the bootstrap.scss file in the node_modules folder, and then any * .scss file inside of our /src/scss folder.

    Then we use the pipe method to pass in our sass variable. This is where it transforms the sass files to regular CSS.

    Then we use gulp.dest to designate the folder in which these new css files will be placed.

    And then finally we use browserSync.stream() to notify the browser.

    Now, we also need another task for handling the required javascript files.
*/
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
/*
    The serve task passes in the sass task that we created earlier. Inside of it, we use browserSync.init to designate a folder for the static server that we can access in the browser.

    Then, we use gulp.watch our sass and html file(s) upon changes. If they change, the browser will reload via browserSync.
*/
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);