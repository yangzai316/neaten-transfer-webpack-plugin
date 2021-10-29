
const { statSync } = require('fs');
const { src, dest } = require('gulp');
const rename = require("gulp-rename");
const chalk = require('chalk');



class NeatenTransferWebpackPlugin {

    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap('NeatenTransferWebpackPlugin', () => {

            const { from, to } = this.options;
            const dirs = [];
            const files = [];
            /**
             * 校验文件信息，并文件类型
             */
            for (let i = 0; i < from.length; i++) {
                try {
                    const data = statSync(`${from[i]?.path}${from[i]?.name}`);
                    data.isDirectory() ? dirs.push(from[i]) : files.push(from[i])
                } catch (error) {
                    return console.log(chalk.red(error));
                }
            };
            /**
             * 批量复制文件
             */
            for (let i = 0; i < files.length; i++) {
                try {
                    pipeFile(files[i], to);
                } catch (error) {
                    return console.log(chalk.red(error));
                }
            };
            /**
             * 批量复制文件夹
             */
            for (let i = 0; i < dirs.length; i++) {
                try {
                    pipeDir(dirs[i], to);
                } catch (error) {
                    return console.log(chalk.red(error));
                }
            };

            console.log(chalk.green('> neaten-transfer-webpack-plugin: Copy success ...'));
        })
    }

};
/**
 * 复制文件夹
 */
const pipeDir = (_src, _dest) => {
    src(`${_src.path}${_src.name}/**/*`)
        .pipe(dest(`${_dest.path}${_dest.name}/${_src.rename || _src.name}`));
}


/**
 * 复制文件
 */
const pipeFile = (_src, _dest) => {
    src(`${_src.path}${_src.name}`)
        .pipe(rename(`${_src.rename || _src.name}`))
        .pipe(dest(`${_dest.path}${_dest.name}`));
};

module.exports = NeatenTransferWebpackPlugin;