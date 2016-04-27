import gulp from 'gulp';
import concatCss from 'gulp-concat-css';
import webpack from 'webpack-stream';

let { src, dest } = gulp;

gulp.task('copy-html', () => (
    src('src/*.html')
        .pipe(dest('dist'))
));

gulp.task('compile-css', done => (
    src('src/css/index.css')
        .pipe(concatCss('app.bundle.css'))
        .on('error', done)
        .pipe(dest('dist'))
));

gulp.task('compile-js', done => (
    src('src/js/index.js')
        .pipe(webpack({
            output: {
                filename: 'app.bundle.js'
            },
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }]
            },
            devtool: 'source-map'
        }))
        .on('error', done)
        .pipe(dest('dist'))
));

gulp.task('watch', () => {
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/css/**/*.css', ['compile-css']);
    gulp.watch('src/js/**/*.{js,jsx}', ['compile-js']);
});

gulp.task('default', ['copy-html', 'compile-css', 'compile-js']);
