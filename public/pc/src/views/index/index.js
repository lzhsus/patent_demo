/**
 * 默认样式+默认逻辑
 */
import '@/common/js/base'
import './index.scss'
// 公共方法
import tools from 'utils/tools';
import appConfig from '@/common/js/appConfig'; 
import Api from '@/api/movie';

class IndexPage {
    init(){
        $("#navigation ul li:eq(0)").addClass("current");
        this.getZscqIndexData()
    }
    getZscqIndexData(){
        Api.zscqIndexData({}).then(res=>{
            if(res.success){
                res = res.result||{}
                let banner = res.banner||[];
                var bannerHtml = ''
                for( let i = 0; i<banner.length; i++ ){
                    const item = banner[i]||{};
                    bannerHtml+='<div class="swiper-slide"><a href="" style="background-image: url('+item.link+');"></a></div>';
                }
                $("#indexBanner").html(bannerHtml);
                new Swiper('.swiper-container',{
                    pagination: '.pagination',
                    paginationClickable: true,
                    autoplay : 5000
                });
            }else{
                $.zb.showModal({
                    showClose:false,
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    }
}

new IndexPage().init()

