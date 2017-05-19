var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var config = {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [new HTMLWebpackPlugin({
        title: "This title is passed from the webpack.config.js",
        minify: { collapseWhitespace: true },
        hash: true,
        template: "./src/html/index.ejs"
    })],

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'build'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },


    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', "source-map-loader"]
        },
        {
            // When you encounter SCSS files, parse them with node-sass,
            // then return the results as a string of CSS
            test: /\.scss/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        { test: /\.png$/, loader: "url-loader?limit=100000" }
        ]
    }
};

module.exports = config;