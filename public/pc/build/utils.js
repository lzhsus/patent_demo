const path = require('path')
const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./config.js')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

/**
 * 多入口配置
 */
exports.entries = () => {
    const entryFiles = glob.sync(baseConfig.NORMAL_PAGE_PATH + `/**/*/${baseConfig.STATIC_JS_NAME}.js`)
    const entry = {}
    entryFiles.forEach(filePath => {
        const fileNameReg = new RegExp(`([^\/]+)\/${baseConfig.STATIC_JS_NAME}.js$`)
        const fileName = filePath.match(fileNameReg)[1]
        entry[fileName] = filePath
    })
    return entry
}
const proBannerPage = ['addetail']

function isproBannerPage(page) {
    for (let i = 0; i < proBannerPage.length; i++) {
        if (page === proBannerPage[i]) {
            return true
        }
    }
    return false;
}
/**
 * 多页面页面配置
 */
exports.htmlPlugin = () => {
    let env_config = process.env.env_config;
    console.log('打包环境env_config：', env_config)

    const entryHtml = glob.sync(baseConfig.NORMAL_PAGE_PATH + `/**/*/${baseConfig.STATIC_TEMPLATE_NAME}.js`)
    const arrHtml = []
    entryHtml.forEach(htmlPath => {
        const htmlReg = new RegExp(`([^\/]+)\/${baseConfig.STATIC_TEMPLATE_NAME}\.js$`)
        const filename = htmlPath.match(htmlReg)[1]
        // 打包路径
        let dev = path.resolve(__dirname, `../${filename}.html`);
        let proPHP = path.resolve(__dirname, `../../../resources/views/zbshop/pc/${filename}.blade.php`);
        let proBanner = path.resolve(__dirname, `../../../resources/views/campaign/banner202010/pc/${filename}.blade.php`);

        let config = {
            template: htmlPath,
            /**
             * 此处逻辑为，单独抽离index.html放到根目录
             * 其余文件打入html文件件
             */
            // filename: filename === 'index' ? `${filename}.html` : `${baseConfig.build.assetsSubDirectory}/${filename}.html`,
            // filename:path.resolve(__dirname,  `../${filename}.html`),
            filename: env_config === 'php' ? proPHP : (env_config === 'php_banner' ? proBanner : dev),
            /**
             * 配置网站favicon.ico
             * 自动注入到页面
             */
            // favicon: resolve('favicon.ico'),
            /**
             * 此处chunks名字与webpack.prod.config.js配置一致
             * optimization.splitChunks.cacheGroups
             * optimization.runtimeChunk
             */
            chunks: ['commons', 'vendor', 'manifest', filename],
            inject: true,
            xhtml: true
        }
        if (process.env.NODE_ENV === 'production') {
            config = merge(config, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        if (env_config === 'php_banner' && isproBannerPage(filename)) {
            arrHtml.push(new HtmlWebpackPlugin(config))
        }
        if (env_config === 'php' && !isproBannerPage(filename)) {
            arrHtml.push(new HtmlWebpackPlugin(config))
        }
        if (env_config !== 'php' && env_config !== 'php_banner') {
            arrHtml.push(new HtmlWebpackPlugin(config))
        }
    })
    return arrHtml
}
/**
 *
 * @param {*} _path
 */
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ? baseConfig.build.assetsSubDirectory : baseConfig.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}