const path = require('path');
const NeatenTransferWebpackPlugin = require('./src/index')

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        library: {
            name: 'hello',
            type: 'umd',
        },
    },
    plugins: [new NeatenTransferWebpackPlugin({
        from: [{
            path: './',
            name: 'dist'
        }, {
            path: './',
            name: 'package.json'
        }],
        to: {
            path: './',
            name: 'new',
            cover: true
        }
    })]
};
