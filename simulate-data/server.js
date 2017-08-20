const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const qs = require('querystring');
// 缓存
var cache = {};

/**
 * 发送404页面
 * @param {Response} response 
 */
const send404 = function (response) {
    response.writeHead(404,{"Content-Type":'text/plain'});
    response.write("Error 404:resource not found");
    response.end();
}

/**
 * 发送文件
 * @param {Response} res 
 * @param {String} filePath 
 * @param {Object} fileContents 
 */
const sendFile = function (res, filePath, fileContents) {
    res.writeHead(
        200,
        {"Content-Type": mime.lookup(path.basename(filePath))}
    );
    res.end(fileContents);
}

/**
 * 静态资源
 * @param {Response} res 
 * @param {Object} cache 
 * @param {String} absPath 
 */
const serveStatic = function (res, cache, absPath) {
    //文件是否在缓存中
    if (cache[absPath]) {
        sendFile(res, absPath, cache[absPath]);
    } else {
        //检查文件是否存在
        fs.exists(absPath, function (exists) {
            if(exists){
                fs.readFile(absPath, function (err, data) {
                    if(err){
                        console.log('读取文件出错');
                    }else{
                        cache[absPath]=data;
                        sendFile(res,absPath,data);
                    }
                })
            } else {
                //send404(res);
                // var notFoundPath='./src/404.html';
                // fs.readFile(notFoundPath,function(err,data){
                //     sendFile(res, notFoundPath, data);
                // });
                send404();
            }
        });
    }
}


var server=http.createServer(function(req,res){
    if (req.url === '/getData' && req.method.toUpperCase() === 'POST') {
        var postData = "";
        /**
         * 因为post方式的数据不太一样可能很庞大复杂，
         * 所以要添加监听来获取传递的数据
         * 也可写作 req.on("data",function(data){});
         */
        req.addListener("data", function (data) {
            postData += data;
        });
        /**
         * 这个是如果数据读取完毕就会执行的监听方法
         */
        req.addListener("end", function () {
            // 拿body的参数
            var query = qs.parse(postData);
            var reqData = JSON.parse(postData);
            var fileName = reqData.path;
            var filePath = "./src/" + fileName;
            serveStatic(res, cache, filePath);        
        });
    }
    else if (req.method.toUpperCase() === 'GET') {   
        serveStatic(res,cache,'.' + req.url);
    }
});
server.listen(8083,function(){
    console.log("1server listening at http://localhost:8083")
})

