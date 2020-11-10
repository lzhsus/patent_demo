const baiduAnalyzer = () => {
  const state = {
    context: `    
    window['_hmt'] = window['_hmt'] || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?8dcb9292fb55b5f6478fed721501d353";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();    
    `
  }

  return `
    <script>${state.context}</script>
  `
}

module.exports = {
  baiduAnalyzer
}
