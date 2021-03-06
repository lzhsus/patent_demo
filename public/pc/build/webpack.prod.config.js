const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const utils = require('./utils.js')
const config = require('./config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: resolve('dist'),
        publicPath: config.build.assetsPublicPath,
        /**
         * 该方案页面路径显示不友好 暂不采取2018.10.07 00:07
         * 模块的js打包后跟着模块走
         * 首页的js单独打包进入js文件夹
         * 其他模块跟着自己的模块走
         * 注意：根据name匹配的首页 index
         * [name]表示entry每一项中的key，用以批量指定生成后文件的名称
         * https://webpack.js.org/configuration/output/#output-filename
         */
        // filename: (bundle) => {
        //   return bundle.chunk.name === 'index' ? 'js/[name].[chunkhash].js' : utils.assetsPath('[name]/[name].[chunkhash].js')
        // },
        filename: 'js/[name].js?v=[chunkhash]',
        // 公共模块js单独放一个js文件夹
        chunkFilename: 'js/[name].js?v=[chunkhash]'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 复用的文件，单独抽离 后续再优化此配置
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                    minSize: 1,
                    priority: 0
                },
                // 提取 node_modules 中代码
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10
                }
            }
        },
        /**
         * 提取 webpack 运行时代码
         * optimization.runtimeChunk 直接置为 true 或设置 name
         * webpack会添加一个只包含运行时(runtime)额外代码块到每一个入口
         * 注：这个需要看场景使用，会导致每个入口都加载多一份运行时代码
         * manifest js have already inline to every html file, please run build and see it in html.
         * Maybe we don't need manifest file, because we are a multi-page application. each html page's js maybe not complex.
         * So it depending on how you understand your js file complex or simple.
         */
        runtimeChunk: {
            name: 'manifest'
        },
        // 样式优化
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    cache: true,
                    parallel: true,
                    comments: false,
                    warnings: false,
                    ie8: true,
                    compress: {
                        // 移除 console
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ISPROD: JSON.stringify(true)
        }),
        // 打包前清理旧文件夹
        // new CleanWebpackPlugin(['dist'], {
        //     root: path.resolve(__dirname, '../'),
        //     verbose: true
        // }),
        // 根据模块的相对路径生成一个四位数的hash作为模块id
        new webpack.HashedModuleIdsPlugin(),
        // 压缩抽离样式
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?v=[chunkhash]',
            chunkFilename: 'css/[name].css?v=[chunkhash]'
        }),

        // 页面模板
        ...utils.htmlPlugin(),

        // 为了减少请求数量, manifest内联在每个html文件内
        // 注意一定要在HtmlWebpackPlugin之后引用
        // inline 的name 和你 runtimeChunk 的 name保持一致
        new ScriptExtHtmlWebpackPlugin({
            //`manifest` must same as runtimeChunk name. default is `manifest`
            inline: /manifest\..*\.js$/
        })
    ]
})
// 分析依赖图
// 执行 npm run analyzer 即可自动打开预览
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
// 打包前清理旧文件夹
if (process.env.env_config =='php'){
    webpackConfig.plugins.push(
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true
        })
    )
}
module.exports = webpackConfig