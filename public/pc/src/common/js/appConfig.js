export default{
	serverPath: (window.location.pathname.indexOf('.html')==-1) ? window["serverPath"] : "http://200826fg0645demo.jdytoy.com/",
    serverPathQh: window["env_name"]=='production'? 'https://filecdn.qiaohu.com/':(window["env_name"]=='test'?'http://zxtiyantest.qiaohu.com/':"http://190122fg0365demo.jdytoy.com/"),
    zbtiyan_url: window["env_name"]=='production'?'https://zb.qiaohu.com/':'https://zbtest.qiaohu.com/'
}