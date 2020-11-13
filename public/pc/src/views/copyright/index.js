/**
 * 默认样式+默认逻辑
 */
import '@/common/js/base'
import './copyright.scss'


class CopygightPage {
    init(){
        $("#navigation ul li:eq(2)").addClass("current");
        this.setUlWidth()
        $(function(){
            var setLeft=0
            var timer=setInterval(function(){
                setLeft+=-1;
                if(setLeft>=400){
                    setLeft=0
                }
                $("ul#certificate").css('marginLeft',setLeft)    
            },10)
        })
    }
    setUlWidth(){
        var liWidth = $("ul#certificate li").css("width");
        var liLength = $("ul#certificate li").length;
        liWidth = liWidth.replace(/px/g,'');
        var ulWidth = Number(liLength)*Number(liWidth);
        $("ul#certificate").css("width",ulWidth+'px')
    }
}


new CopygightPage().init();