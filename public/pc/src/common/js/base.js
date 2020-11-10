// 公用css 引入入口
import '../css/base.scss'

// @babel/polyfill
import '@babel/polyfill'

// 公用js逻辑编写区域
import './header'
import './footer'
import './navigation'
import '../../vendor/common/jquery-dialog'
import '../../vendor/common/loading'

// 低版浏览器兼容placeholder
if( !('placeholder' in document.createElement('input')) ){
    $('input[placeholder]').each(function(){
        var that = $(this),
        text = that.attr('placeholder');
        if( that.val()==="" ){
            that.val(text).addClass('placeholder');
        }
        that.focus(function(){
            if( that.val()===text ){
                that.val("").removeClass('placeholder');
            }
        })
        .blur(function(){
            if( that.val()==="" ){
                that.val(text).addClass('placeholder');
            }
        })
        .closest('form').submit(function(){
            if( that.val() === text ){
                that.val('');
            }
        });
    });
}

// 登录弹层
window.setloginPopFun = ()=>{
    $("body").append('<div class="login-pop" id="login-pop">'+
        '<span class="after">'+'</span>'+
        '<div class="login-pop-main">'+
            '<span class="close"></span>'+
            '<span class="login-btn"></span>'+
        '</div>'+        
    '</div>');
    $("#login-pop").fadeIn();
    // 关闭
    $("#login-pop .close").off("click").on("click", function(){
        $("#login-pop").remove();
    });
    // 登录
    $("#login-pop .login-btn").off("click").on("click", function(){
        window.location.href = qiaohu_url+'site/requiredLogin?returnurl='+encodeURIComponent(window.location.href);
    });
}