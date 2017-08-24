const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const publicPath = path.join(__dirname, 'public');
const resourcesPath = path.join(publicPath, 'resources');

const killPlugin = function () {
    this.plugin('done', stats => {
        if (stats.compilation.errors && stats.compilation.errors.length > 0) {
            stats.compilation.errors.forEach(err => console.error(err.message));
            process.exit(1);
        }
    });
};

const staticAssetsPlugin = new CopyWebpackPlugin([
    { from: path.join(__dirname, 'assets/html/auth.html'), to: publicPath },
    { from: path.join(__dirname, 'assets/html/index.html'), to: publicPath },
    { from: path.join(__dirname, 'assets/html/attachments.html'), to: publicPath },
    { from: path.join(__dirname, 'manifest.json'), to: publicPath },
    { from: path.join(__dirname, 'assets/images/rung-full-white.png'), to: resourcesPath },
    { from: path.join(__dirname, 'assets/images/rung-white.png'), to: resourcesPath },
    { from: path.join(__dirname, 'assets/images/rung-gray.png'), to: resourcesPath },
    { from: path.join(__dirname, 'assets/images/rung.png'), to: resourcesPath }
]);

module.exports = {
    entry: {
        trello: './src/lib/trello.js',
        index: './src/App.jsx'
    },
    output: {
        path: publicPath,
        filename: '[name].min.js'
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
                    }
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         query: {
                    //             bypassOnDebug: true,
                    //             optipng: {
                    //                 optimizationLevel: 7
                    //             },
                    //             gifsicle: {
                    //                 interlaced: true
                    //             }
                    //         }
                    //     }
                    // }
                ]
            }
        ]
    },
    plugins: [
        killPlugin,
        staticAssetsPlugin
    ]
};
