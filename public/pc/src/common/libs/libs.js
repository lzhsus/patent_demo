/**
 * 第三方库地址映射变量
 * src/layout/layout/layout.js 初始化注入配置信息
 * src/layut/base/footerBase/footerBase.ejs 自动注入页面body之前
 * src/layut/base/headBase/headBase.ejs 自动注入head
 * 注意路径问题
 * 只需要在此处配置好，页面会自动遍历js和fixIe引入的文件到对应位置
 */
const addThirdLibrary = {
  STATIC_BUILD: {
    js: {
      // If you want to load third library, you can set like this.
      // Will inject bottom of page body.
      jquery: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/common/jquery.min.js'),
      jqueryQuery: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/common/jquery.query.js'),
      jqueryCookie: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/common/jquery.cookie.js'),
      jqueryLightBox: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/common/jquery-lightbox_me.js'),
      idangerousSwiper: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/common/idangerous.swiper.min.js')
    },
    fixIe: {
      html5shive: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/fix-ie/html5shiv.min.js'),
      respond: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/fix-ie/respond.min.js'),
      es5shim: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/fix-ie/es5-shim.min.js'),
      es5sham: require('!!file-loader?name=libs/js/[name].[ext]!../../vendor/fix-ie/es5-sham.min.js')
    }
  }
}
module.exports = addThirdLibrary
