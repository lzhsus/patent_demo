import appConfig from '@/common/js/appConfig'; 
let href = window.location.href
export default {
    getLocationLink: function(link){
        if( !link ) return '';
        if( link.indexOf('http')==-1 ) {
            link = (appConfig.serverPath+"storage/"+link);
        }
        link = link.replace(/^https:|^http:/g,'')
        return link;
    },
    getQhGoodsLink:  function(link){
        if( !link ) return '';
        if( link.indexOf('http')==-1 ) {
            link = appConfig.serverPathQh + link;
        }
        link = link.replace(/^https:|^http:/g,'')
        return link;
    },
    formatMoney: function (value){
        value = Number(value)
        if (isNaN(value)) {
            return '--'
        }
        value = (value / 100).toFixed(2)
        if (Math.abs(value) < 1000) {
            return value
        }
        return priceSplit(String(value));
    },
    formatWeight: function (value){
        value = Number(value)
        if (isNaN(value)) {
            return '--'
        }
        value = (value / 1000).toFixed(3)
        if (Math.abs(value) < 10000) {
            return value
        }
        return priceSplit(String(value));
    },
    priceSplit: function(value){
        return value.replace(/./g, (c, i, a) => i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c);
    },
    countTimeNum: function(leftTime){
        let d = Math.floor(leftTime/1000/60/60/24);  
        let h = Math.floor(leftTime/1000/60/60%24);  
        let m = Math.floor(leftTime/1000/60%60);  
        let s = Math.floor(leftTime/1000%60);
        let ds = (d*24)+h;
        if( (d+h+m+s)<=0 ) return 0;
        return (ds<=9?"0"+ds:ds)+'时'+(m<=9?"0"+m:m)+'分'+(s<=9?"0"+s:s)+'秒';
    },
    countTime: function(leftTime, cb){
        let t = leftTime
        let times = setInterval(()=>{
            t = t-1000;
            let lastNum = countTimeNum(t);
            if( lastNum<=0 ){
                clearInterval(times);        
                cb(0);
            }
            cb&&cb(lastNum);
        },1000);
    },
    setTagsCallBack: function(list){
        let tempList = list.map((item,index)=>{
            var obj = {}
            if(item=='新品'){
                obj.id = 1
            }else if(item=='人气'){
                obj.id = 2
            }else if(item=='积木'){
                obj.id = 3
            }else{
                obj.id = 1
            }
            obj.name = item;
            return obj;
        })
        return tempList;
    },
    // 设置
    tempCartLocalStorage:function (sku_id){
        if(Object.prototype.toString.call(sku_id) === '[object Array]'){
            sku_id = sku_id
        }else{
            sku_id = [sku_id]
        }
        for(let i=0;i<sku_id.length;i++){
            const skuId = sku_id[i]
            var tempSkuIDList = localStorage.getItem('temp_sku_id')||[];
            if(tempSkuIDList.length){
                tempSkuIDList = JSON.parse(tempSkuIDList)
            }
            var index = -1;
            for(let i=0;i<tempSkuIDList.length;i++){
                if(tempSkuIDList[i].sku_id == skuId){
                    index = i;
                    break;
                }
            }
            if(index==-1){
                tempSkuIDList.push({
                    sku_id:skuId,
                    create_time:new Date()
                })
            }else{
                tempSkuIDList[index].create_time = new Date();
            }
            localStorage.setItem('temp_sku_id',JSON.stringify(tempSkuIDList))
        }
    },
    // 获取
    getTempCartLocalStorage:function(){
        var tempSkuIDList = localStorage.getItem('temp_sku_id')||[];
        if(tempSkuIDList.length){
            tempSkuIDList = JSON.parse(tempSkuIDList)
        }
        let newTime = (new Date()).getTime()
        for(let i=0;i<tempSkuIDList.length;i++){
            const create_time = tempSkuIDList[i].create_time;
            const oldTime = (new Date(create_time)).getTime();
            if((newTime-oldTime)/1000>60*60*2){
                tempSkuIDList[i].is_hint=true
            }
        }
        var newArr = []
        for(let i=0;i<tempSkuIDList.length;i++){
            if(!tempSkuIDList[i].is_hint){
                newArr.push(tempSkuIDList[i])
            }
        }
        localStorage.setItem('temp_sku_id',JSON.stringify(newArr))
        return newArr||[]
    },
    delTempCartLoaclStorage:function (sku_id){
        if(Object.prototype.toString.call(sku_id) === '[object Array]'){
            sku_id = sku_id
        }else{
            sku_id = [sku_id]
        }
        for(let i=0;i<sku_id.length;i++){
            const skuId = sku_id[i]
            var tempSkuIDList = localStorage.getItem('temp_sku_id')||[];
            if(tempSkuIDList.length){
                tempSkuIDList = JSON.parse(tempSkuIDList)
            }
            var index = -1;
            for(let i=0;i<tempSkuIDList.length;i++){
                if(tempSkuIDList[i].sku_id == skuId){
                    index = i;
                    break;
                }
            }
            if(index!=-1){
                tempSkuIDList.splice(index,1)
                localStorage.setItem('temp_sku_id',JSON.stringify(tempSkuIDList))
            }
        }
    },
    openPageLink: function(link,isReplace){
        if( href.indexOf("localhost")==-1 ){
            let locationLink;
            let linkParam = link.split("?");	
            var outJump = 0;	
            if( link.indexOf("index.html")!=-1 ){
                locationLink = "index";
            }
            if( link.indexOf("classify.html")!=-1 ){
                locationLink = "goodslist";
            }
            if( link.indexOf("createaddress.html")!=-1 ){
                locationLink = "address";
            }
            if( link.indexOf("detail.html")!=-1 ){
                locationLink = "goodsinfo";
            }
            if( link.indexOf("orderinfo.html")!=-1 ){
                locationLink = "orderinfo";
            }
            if( link.indexOf("payresult.html")!=-1 ){
                locationLink = "orderresult";
            }
            if( link.indexOf("search.html")!=-1 ){
                locationLink = "goodssearch";
            }
            if( link.indexOf("shopcart.html")!=-1 ){
                locationLink = "shoppingcart";
            }	
            // 其他
            if( link.indexOf("my.html")!=-1 ){
                outJump = 1;	
                locationLink = qiaohu_url + "site/index";
            }		
            if( link.indexOf("point.html")!=-1 ){
                outJump = 1;	
                locationLink = appConfig.zbtiyan_url + "pointshop/index/integral";
            }
            if( link.indexOf("orderdetail.html")!=-1 ){
                outJump = 1;	
                locationLink = qiaohu_url + "OrderInfo/OrderList"
            }
            
    
            if( linkParam[1] ){
                locationLink = locationLink+"?"+linkParam[1];
            }else{
                locationLink = locationLink;
            }
            // 当前平台
            if( platform == 'm' ){
                link = '/zbshop/m/index/' + locationLink;
            }else if( platform == 'pc'){
                link = '/zbshop/index/' + locationLink;
            }
            // 外跳转
            if(outJump==1){
                link = locationLink;
            }
        }
        if(isReplace){
            window.location.replace(link);
        }else{
            window.location.href = link;
        }
    },
    myBrowser:function(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器 
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1; //判断是否Chrome浏览器
        console.log('userAgent',userAgent)
        
        //判断是否IE浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        }; 
        if (isIE) {
            var IE5 = IE55 = IE6 = IE7 = IE8 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE55 = fIEVersion == 5.5;
            IE6 = fIEVersion == 6.0;
            IE7 = fIEVersion == 7.0;
            IE8 = fIEVersion == 8.0;
            if (IE55) {
                return true;
            }
            if (IE6) {
                return true;
            }
            if (IE7) {
                return true;
            }
            if (IE8) {
                return true;
            }
        }//isIE end
        if (isChrome){
            return false;
        }
        if (isFF) {
            return false;
        }
        if (isOpera) {
            return false;
        }
        if (isSafari) {
            return false;
        }
        if (isEdge) {
            return true;
        }
        return false;
    }
}

function priceSplit(value){
    return value.replace(/./g, (c, i, a) => i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c);
}