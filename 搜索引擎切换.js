// ==UserScript==
// @name         搜索引擎切换
// @namespace    https://github.com/maxadc/tampermonkey/blob/main/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E5%88%87%E6%8D%A2.js
// @version      1
// @description  搜索引擎切换
// @author       ant
// @match        http*://cn.bing.com/search?q=*
// @match        http*://www.baidu.com/s?wd=*
// @match      http*://*.google.co.jp/search?q=*
// @match      http*://*.google.com/search?q=*
// @match      http*://www.chinaso.com/newssearch/all/allResults?q=*
// @match        http*://*.duckduckgo.com/*
// @grant        GM_registerMenuCommand
// @run-at1       document-start
// ==/UserScript==

/**
 * 使用以及自己添加还是比较简单,按照格式来就行.需要注意的是,如果是添加自己的搜索引擎,
 * 许要修改 //@match 按照格式添加,*是通配符,不能添加到域的后缀上.
 * 特别是谷歌搜索引擎需要注意,如果常用的不是国际版或日本版记得增加自己的域名
 * 另外给"中国搜索"打个广告,
 * 中国搜索是中国官方推出的搜索引擎,主打干净,没有广告,没有任何非法内容,适合小孩子用.
 */
let SiteConfig = {//网站规则配置
    baidu: {  // 百度
        webUrlReg: /https*:\/\/www\.baidu\.com\/s\?wd=([^\s&]+)/,
        name: "百度",
        searchUrl: "https://www.baidu.com/s?wd="
    },
    cnbing: {  // bing中国
        webUrlReg: /https*:\/\/cn\.bing\.com\/search\?q=([^\s&]+)/,
        name: "cnbing",
        searchUrl: "https://cn.bing.com/search?q="
    },
    google: {  // 日本谷歌，日本谷歌相对快些
        webUrlReg: /https*:\/\/www\.google\..{3,5}?\/search\?q=([^\s&]+)/,
        name: "日本google",
        searchUrl: "https://www.google.co.jp/search?q="
    },
    chinaso: {  // 中国搜索
        webUrlReg: /https*:\/\/www\.chinaso\.com\/newssearch\/all\/allResults\?q=([^\s&]+)/,
        name: "中国搜索",
        searchUrl: "https://www.chinaso.com/newssearch/all/allResults?q="
    },
    duckduckgo: {  // duckduckgo
        webUrlReg: /https*:\/\/html\.duckduckgo\.com\/html\/\?q=([^\s&]+)/,
        name: "duckduckgo",
        searchUrl: "https://html.duckduckgo.com/html/?q="
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

