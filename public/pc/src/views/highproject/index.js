/**
 * 默认样式+默认逻辑
 */
import '@/common/js/base'
import './highproject.scss'
class HighprojectPage {
  init() {
    $('#navigation ul li:eq(4)').addClass('current')
  }
}

new HighprojectPage().init()
