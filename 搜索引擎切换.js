// ==UserScript==
// @name         搜索引擎切换
// @namespace    https://your-website-here.com/
// @version      1
// @description  Redirects from outbound links via specific targets.
// @author       Your Name Here
// @match        http*://cn.bing.com/search?q=*
// @match        http*://www.baidu.com/s?wd=*
// @match        http*://www.google.com/search?q=*
// @grant        GM_registerMenuCommand
// @run-at1       document-start
// ==/UserScript==

let SiteConfig = {//网站规则配置
    baidu: {  // 百度
        webUrlReg: /https*:\/\/www\.baidu\.com\/s\?wd=([^\s&]+)/,
        name: "百度",
        searchUrl: "https://www.baidu.com/s?wd="
    },
    cnbing: {  // pythonthree
        webUrlReg: /https*:\/\/cn\.bing\.com\/search\?q=([^\s&]+)/,
        name: "cnbing",
        searchUrl: "https://cn.bing.com/search?q="
    },
    google: {  // pythonthree
        webUrlReg: /https*:\/\/www\.google\.com\/search\?q=([^\s&]+)/,
        name: "google",
        searchUrl: "https://www.google.com/search?q="
    }
}

var currentUrl = window.location.href;
var keywords ;

for (var item in SiteConfig) {
    let result = currentUrl.match(new RegExp(SiteConfig[item].webUrlReg));
    console.log("item=",SiteConfig[item]);
    if (result !== null) {
        keywords = decodeURIComponent(result[1]); //直接写搜索关键字,比较简单
    }else{
        (function(q) { 
            GM_registerMenuCommand("切换到"+SiteConfig[item].name,  function () {
                切换搜索引擎(q);
            });
        })(SiteConfig[item].searchUrl);
    }
}

function 切换搜索引擎(q){
    window.location.href = q+keywords;
}

