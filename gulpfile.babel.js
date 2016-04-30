import gulp from 'gulp';
import concatCss from 'gulp-concat-css';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import babel from 'gulp-babel';
import cleanCss from 'gulp-clean-css';

let { src, dest } = gulp;

gulp.task('copy-html', () => (
    src('src/*.html')
        .pipe(dest('dist'))
));

gulp.task('compile-css', done => (
    src('src/css/index.css')
        .pipe(concatCss('app.bundle.css'))
        .pipe(cleanCss())
        .on('error', done)
        .pipe(dest('dist'))
));

gulp.task('compile-js', done => (
    src('src/js/index.js')
        .pipe(webpackStream({
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
            devtool: 'source-map',
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            ]
        }))
        .on('error', done)
        .pipe(dest('dist'))
));

gulp.task('compile-sw', () =>
    src('src/js/sw.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(dest('dist'))
);

gulp.task('watch', () => {
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/css/**/*.css', ['compile-css']);
    gulp.watch('src/js/**/*.{js,jsx}', ['compile-js']);
    gulp.watch('src/js/sw.js', ['compile-sw']);
});

gulp.task('default', ['copy-html', 'compile-css', 'compile-js', 'compile-sw']);
