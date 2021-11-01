<div>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>
</br>

[![NPM version](https://img.shields.io/npm/v/neaten-transfer-webpack-plugin.svg)](https://www.npmjs.com/package/neaten-transfer-webpack-plugin)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yangzaiwangzi/neaten-transfer-webpack-plugin/blob/main/LICENSE) 
# neaten-transfer-webpack-plugin
用于将多个不在同级目录中文件或多个不在同级目录中文件夹复制到另一个文件中的webpack plugin，会在webpack打包编译结束之后执行。

## 使用方法

首先，你需要安装这个插件，如下：

```console

npm install neaten-transfer-webpack-plugin --save-dev

```

配置 webpack plugins 参数

```javascript

const NeatenTransferWebpackPlugin = require('./src/index')

module.exports = {
    //...
    plugins: [new NeatenTransferWebpackPlugin({
        from: [{
            path: path.resolve(__dirname, './'),
            name: 'dist'
        }, {
            path: path.resolve(__dirname, './'),
            name: 'package.json'
        }],
        to: {
            path: path.resolve(__dirname, './'),
            name: 'new',
            cover: true
        }
    })]
    //...
};

```

## 插件参数描述
| Name  |  Type  | Description              |
| :---: | :----: | :----------------------- |
| from  | Array  | 需要被复制的文件或文件夹 |
|  to   | Object | 被复制到的位置           |

下面是每个参数的详细描述

### from
需要被复制的文件或文件夹，数组类型，支持多个
|  Name  |  type   | required | Description      |
| :----: | :-----: | :------: | :--------------- |
|  path  | require |   yes    | 文件所在位置     |
|  name  | String  |   yes    | 文件名           |
| rename | String  |    no    | 重命名后的新名字 |

```javascript

[
    {
        path: './',    // 文件所在位置
        name: 'dist',  // 文件名
        rename:'dist2' // 重命名后的新名字，不传则不重命名
    }
]

```
### to
被复制到的位置，对象类型
| Name  |  type   | required | Description                     |
| :---: | :-----: | :------: | :------------------------------ |
| path  | String  |   yes    | 文件夹所在位置                  |
| name  | String  |   yes    | 文件夹名                        |
| cover | Boolean |    no    | 是否覆盖该文件夹下所有的文件 ， |

```javascript

{
    path: './',    // 文件所在位置
    name: 'dist',  // 文件名
    cover: true    // true：相同的文件覆盖，不同的文件删除；false：相同的文件覆盖，不同的文件保留；默认为true
}

```

### DOME
```
# 原文件位置如下，可复制为dist 和 config.js 到 new 文件夹下
- root
    - dist
        - a.js
        - b.js
    - config.js

# 复制后的文件位置：
- root
    - dist
        - a.js
        - b.js
    - config.js
    - new
        - dist
            - a.js
            - b.js
        - config.js

# 插件配置如下：
plugins: [new NeatenTransferWebpackPlugin({
    from: [{
        path: path.resolve(__dirname, './'),
        name: 'dist'
    }, {
        path: path.resolve(__dirname, './'),
        name: 'package.json'
    }],
    to: {
        path: path.resolve(__dirname, './'),
        name: 'new',
        cover: true
    }
})];
```