(function ($) {
    $.zb = {
        showModal: function (options) {
            let defaults = {
                showClose: true,
                title: "",
                content: "",
                showCancel: true,
                success: function(){},
                cancelText:"取 消",
                confirmText:"确 定",
                cancelColor: "#f3f3f3",
                confirmColor: "#fee101"
            };
            var opts = $.extend({}, defaults, options);
            let $popHtml = `<div id="del-pop"><div class="pop-main">`;
            if (opts.showClose) $popHtml += `<div class="close-btn"></div>`;
            $popHtml += `<div class="pop-content-main">`;
            if (opts.title) $popHtml += `<div class="title">${opts.title}</div>`;
            if (opts.content) $popHtml += `<div class="massing">${opts.content}</div>`;
            $popHtml += `</div><div class="btn-foot-box">`;
            if (opts.showCancel) $popHtml += `<span class="cancel-span" style="background-color:${opts.cancelColor}">${opts.cancelText}</span>`;
            if (opts.showCancel) $popHtml += `<span class="confirm-span" style="background-color:${opts.confirmColor}">${opts.confirmText}</span>`;
            if (!opts.showCancel) $popHtml += `<span class="confirm-span width-long" style="background-color:${opts.confirmColor}">${opts.confirmText}</span>`;
            $popHtml += `</div></div>'</div>`;
            $("body").append($popHtml);
            $('#del-pop').lightbox_me({
                centered: true,
                overlaySpeed: 50,
                lightboxSpeed: 100,
                onLoad: function () {}
            });

            // 关闭
            $("#del-pop .close-btn").off("click").on("click", function () {
                $('#del-pop').trigger('close');
                $("#del-pop").remove();
                opts.success({
                    cancel: true
                });
            });
            // 取消
            $("#del-pop .cancel-span").off("click").on("click", function () {
                $('#del-pop').trigger('close');
                $("#del-pop").remove();
                opts.success({
                    cancel: true
                });
            });
            // 确定
            $("#del-pop .confirm-span").off("click").on("click", function () {
                $('#del-pop').trigger('close');
                $("#del-pop").remove();
                opts.success({
                    confirm: true
                });
            });
        }
    };
})($);
