var gulp = require('gulp');
var eslint = require('gulp-eslint');
var del = require('del');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

gulp.task('default', ['lint', 'webpack-dev-server'], function() {
  gulp.watch('src/**/*', ['lint']);
});

gulp.task('lint', function() {
  return gulp.src('./src/**/**.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('webpack-dev-server', function(callback) {
  var ip = process.env.IP || '0.0.0.0';
  var port = process.env.PORT || 8080;
  var config = Object.assign({}, webpackConfig);
  config.devtool = 'eval';
  config.entry.unshift('webpack-dev-server/client?http://' + ip + ':' + port, 'webpack/hot/only-dev-server')
  config.module.loaders[0] = {test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/}
  config.plugins = (config.plugins || []).concat(new webpack.HotModuleReplacementPlugin())

  var server = new WebpackDevServer(webpack(config), {
    historyApiFallback: {index: '/src/'},
    host: ip,
    hot: true,
    stats: false
  }).listen(port, ip, function(err) {
    if (err) throw new Error(err);
    console.log('webpack: server running at port ' + port);
    callback();
  });
});

// Build process
gulp.task('build', ['build:scripts', 'build:html']);

gulp.task('build:clean', function() {
  return del('./dist');
});

gulp.task('build:html', ['build:clean'], function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:scripts', ['build:clean'], function() {
  var config = Object.assign({}, webpackConfig);

  config.plugins = (config.plugins || []).concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false})
  );

  return gulp.src('./src/app.js')
    .pipe(webpackStream(config))
    .pipe(gulp.dest('./dist'));
});
