let express = require('express');
let ffmpeg = require('fluent-ffmpeg');
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

app.post('/pcm', function (req, res) {
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

app.post('/m4a', function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    console.log(req);  // 上传的文件信息
    let voiceBase64 = new Buffer('');
    let command = ffmpeg(req.files[0].path)
        .noVideo()
        .inputFormat('m4a')
        .audioCodec('pcm_s16le')
        .audioBitrate(16)
        .audioFrequency(16000)
        .audioChannels(1)
        .format('s16le')
        .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function() {
            console.log('success');
        });
    let ffstream = command.pipe();
    ffstream.on('data', function(chunk) {
        voiceBase64 = Buffer.concat([voiceBase64, new Buffer(chunk)]);
        console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
    });
    ffstream.on('end', function() {
        console.log('data ' + voiceBase64.length + ' bytes');
        client.recognize(voiceBase64, 'pcm', 16000).then(function(result) {
            res.end(JSON.stringify(result));
        }, function(err) {
            res.end(err);
        });
    });

});

let server = app.listen(7777, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});