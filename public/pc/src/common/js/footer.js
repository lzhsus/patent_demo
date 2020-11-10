// 版权电话显示
$('#moreTel').on('click', function() {
    $(this).hide();
    $("#telList").slideDown();
});

// 打开客服
$(".zxkf").on("click", function(){
    ud('init');
});