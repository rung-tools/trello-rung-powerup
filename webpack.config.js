const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/index.js',
        authorize: './src/authorize.js'
    },
    output: {
        path: path.join(__dirname, 'public/'),
        filename: '[name].js'
    },
    externals: {
        'power-up': 'TrelloPowerUp'
    },
    plugins: [new CopyWebpackPlugin([
        { from: './src/*.html', flatten: true },
        { from: './src/*.json', flatten: true },
        { from: './src/assets/', to: 'assets' }
    ])]
};
