/**
 * 默认样式+默认逻辑
 */
import '@/common/js/base'
import './help.scss'


class helpPage{
    init(){
        let _this = this;
        // 展开 或者关闭一级菜单
        $(".help-tabbar").on("click",".title ",function(event){
            let $subside = $(this).parent()
            event.preventDefault();
            if($subside.find('.item-ul').css("display")=='none'){
                $subside.find('.item-ul').slideToggle();
                // $subside.find('.item-ul').css("display",'block')
            }else{
                $subside.find('.item-ul').slideUp();
                // $subside.find('.item-ul').css("display",'none')
            }
            
        })
        // 点击二级菜单
        $(".help-tabbar").on("click",".item-li",function(){
            let $title = $(this).parent().prev();
            let id = $(this).attr("id")
            if($title.hasClass('active')){
                if(!$(this).hasClass('active')){
                    $(this).parent().find('.item-li').removeClass('active');
                    $(this).addClass("active");
                }
            }else{
                $('.subside-mod .title').removeClass('active');
                $('.subside-mod .item-li').removeClass('active');
                $title.addClass("active");
                $(this).addClass("active");
            }
            console.log()
            _this.setInfoTitle(id)
        })
        // 初始话title
        this.setInfoTitle()
    }
    setInfoTitle(id){
        id=id||'1-1';

        let str = "常见问题分类";
        let $title01 = $(".help-tabbar .title.active").text();
        let $title02 = $(".help-tabbar .item-li.active").text();
        if($title01){
            str = str + '  >  ' + $title01;
        }
        if($title02){
            str = str + '  >  ' + $title02;
        }
        $(".help-info .h3-title").text(str)
        $(".help-info .help-info-content").hide();
        $(".help-info .help-info-content[id="+id+"]").show();

    }
}
new helpPage().init();