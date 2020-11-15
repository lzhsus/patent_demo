/**
 * 默认样式+默认逻辑
 */
import '@/common/js/base'
import './brand.scss'

class BrandPage {
  init() {
    $('#navigation ul li:eq(3)').addClass('current')
  }
}

new BrandPage().init()
