var pathFn = require('path');
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function(args) {
    var log = this.log;
    var config = this.config;

    var urlsPath = process.env.BAIDU_URL_SUBMIT_PATH || config.baidu_url_submit.path;
    var host = process.env.BAIDU_URL_SUBMIT_HOST || config.baidu_url_submit.host;
    var token = process.env.BAIDU_URL_SUBMIT_TOKEN || config.baidu_url_submit.token;

    var publicDir = this.public_dir;
    var baiduUrlsFile = pathFn.join(publicDir, 'baidu_urls.txt');
    var urls = fs.readFileSync(baiduUrlsFile, 'utf8');

    log.info("Submitting urls \n" + urls)

    var target = "http://data.zz.baidu.com/urls?site=" + host + "&token=" + token;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', target, false);
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.onload = function () {
        console.log(this.responseText);
    };
    xhr.send(urls);
};