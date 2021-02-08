import appConfig from '@/common/js/appConfig'; 
var href = window.location.href;

export default {
	zscqIndexData: (params={}) =>{
		return request({url:"https://env-vvwpklgy-1258231492.tcloudbaseapp.com/static/index.json",method:"GET",params})
	},	
}

var request = (data)=> {
	var dtd = $.Deferred();
    var $ajax = null;
    var url = /http{1,}/.test(data.url)?data.url: appConfig.serverPath + data.url;
    
	if( data.method=='POST' ){
		$ajax = $.post(url, data.params);
	}else if( data.method=='GET' ){
		$ajax = $.get(url, data.params);
	}else{
        $ajax = $.getJSON(url+'?callback=?', data.params);
	}
	$ajax.done(res => {
		dtd.resolve(res);
	})
	.fail(res=> {
        console.log(url,res)
        $.zb.showModal({
            showClose:false,
            content:"网络错误，请刷新重试！",
            showCancel:false
        })
		dtd.reject(res);
	});
	return dtd;
}


