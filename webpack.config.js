const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const publicPath = path.join(__dirname, 'public');

const killPlugin = function () {
    this.plugin('done', stats => {
        if (stats.compilation.errors && stats.compilation.errors.length > 0) {
            stats.compilation.errors.forEach(err => console.error(err.message));
            process.exit(1);
        }
    });
};

const staticAssetsPlugin = new CopyWebpackPlugin([
    { from: path.join(__dirname, 'assets/html/index.html'), to: publicPath }
]);

module.exports = {
    entry: ['./src/App.jsx'],
    output: {
        path: publicPath,
        filename: 'index.min.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'resources/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                bypassOnDebug: true,
                                optipng: {
                                    optimizationLevel: 7
                                },
                                gifsicle: {
                                    interlaced: true
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        killPlugin,
        staticAssetsPlugin
    ]
};
