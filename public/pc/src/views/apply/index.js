/**
 * 默认样式+默认逻辑
 */
import '@/common/js/base'
import './apply.scss'


class ApplyPage {
    init(){
        $("#navigation ul li:eq(1)").addClass("current");
        
    }
}


new ApplyPage().init();