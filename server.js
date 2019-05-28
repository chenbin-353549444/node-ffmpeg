let express = require('express');
let fs = require('fs');
let app = express();
let AipSpeech = require("baidu-aip-sdk").speech;

let client = new AipSpeech(0, 'iXCDUMbDyk9At3llLTzG2ar6', 'VUo9Ei6FbU7ACVrkrVtccpENHbF33VZg');

let bodyParser = require('body-parser');
let multer  = require('multer');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
});

app.post('/file_upload', function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    console.log(req.files[0]);  // 上传的文件信息
    fs.readFile( req.files[0].path, function (err, data) {
        let voiceBase64 = new Buffer(data);
        client.recognize(voiceBase64, 'pcm', 16000).then(function(result) {
            res.end(JSON.stringify(result));
        }, function(err) {
            res.end(err);
        });
    });
});

var server = app.listen(7777, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});