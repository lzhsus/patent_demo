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
if (!('placeholder' in document.createElement('input'))) {
    $('input[placeholder]').each(function () {
        var that = $(this),
            text = that.attr('placeholder');
        if (that.val() === "") {
            that.val(text).addClass('placeholder');
        }
        that.focus(function () {
                if (that.val() === text) {
                    that.val("").removeClass('placeholder');
                }
            })
            .blur(function () {
                if (that.val() === "") {
                    that.val(text).addClass('placeholder');
                }
            })
            .closest('form').submit(function () {
                if (that.val() === text) {
                    that.val('');
                }
            });
    });
}

// 登录弹层
window.setloginPopFun = () => {
    $("body").append('<div class="login-pop" id="login-pop">' +
        '<span class="after">' + '</span>' +
        '<div class="login-pop-main">' +
        '<span class="close"></span>' +
        '<span class="login-btn"></span>' +
        '</div>' +
        '</div>');
    $("#login-pop").fadeIn();
    // 关闭
    $("#login-pop .close").off("click").on("click", function () {
        $("#login-pop").remove();
    });
    // 登录
    $("#login-pop .login-btn").off("click").on("click", function () {
        window.location.href = qiaohu_url + 'site/requiredLogin?returnurl=' + encodeURIComponent(window.location.href);
    });
}

$(function () {
    // 回到顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50){
            if($("#go-top").length) return;
            $("body").append(`<img id="go-top" src="data:image/png;base64,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" style="display:block;width:80px;position: fixed;bottom: 160px;right: 12px;z-index: 99;" />`)
        }
        else{
            $("#go-top").remove();
        }
    });
    $("body").on('click','#go-top',function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    });
})