const path = require('path');
const NeatenTransferWebpackPlugin = require('./../src/index')
module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './../dist'),
        filename: 'bundle.js',
        library: {
            name: 'hello',
            type: 'umd',
        },
    },
    plugins: [new NeatenTransferWebpackPlugin({
        from: [{
            path: path.resolve(__dirname, './../'),
            name: 'dist'
        }, {
            path: path.resolve(__dirname, './../'),
            name: 'webpack.config.js'
        },],
        to: {
            path: path.resolve(__dirname, './../'),
            name: 'new'
        }
    })]
};