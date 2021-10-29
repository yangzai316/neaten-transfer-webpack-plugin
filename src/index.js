
const { statSync } = require('fs');
const { src, dest } = require('gulp');
const rename = require("gulp-rename");
const chalk = require('chalk');
const rimraf = require('rimraf');


class NeatenTransferWebpackPlugin {

    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap('NeatenTransferWebpackPlugin', () => {
            // 对 to 进行参数校验
            if (!this.options?.to || !this.options?.to?.name || !this.options?.to?.path) {
                return console.log(chalk.red(`> neaten-transfer-webpack-plugin is ERROR：to | to.name | to.path is required`));
            }
            const to = { cover: true, ...this.options.to };
            // 不做覆盖操作
            if (!to.cover) return pipe(this.options);
            // 移除目标文件夹，后面重新添加
            rimraf(`${to.path}${to.name}`, (err) => {
                if (err) return console.log(chalk.red(`> neaten-transfer-webpack-plugin is ERROR： Remove finder ${err}`));

                console.log(chalk.green(`> neaten-transfer-webpack-plugin: Remove finder ${to.name} success ...`));
                pipe(this.options);
            });

        })
    }

};

/**
 * 批量处理文件or文件夹复制
 */
const pipe = ({ from, to }) => {
    const dirs = [];
    const files = [];
    /**
     * 校验文件信息，并文件类型
     */
    for (let i = 0; i < from.length; i++) {
        if (!from[i] || !from[i]?.name || !from[i]?.path) {
            return console.log(chalk.red(`> neaten-transfer-webpack-plugin is ERROR：from | from.name | from.path is required`));
        }
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

    console.log(chalk.green(`> neaten-transfer-webpack-plugin: Transfer files into finder ${to.rename || to.name} success ...`));
}
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