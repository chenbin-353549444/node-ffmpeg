## 语音识别（支持pcm和m4a）
web.chenb.top

### 说明
使用百度的语音识别接口，用FFMPEG转音频文件

### 部署
修改server.js的`API Key`和`Secret Key`  
在安装好Docker的机器上运行`sh run.sh`，如果有Jenkins可以直接新建管道构建  
完成后访问测试页面(http://127.0.0.1:80/index.htm)
![](view.jpg)

### 参考
百度接口文档:(http://ai.baidu.com/docs#/ASR-Online-Node-SDK/8b3186c3)  
node-fluent-ffmpeg:(https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#creating-an-ffmpeg-command)  
FFMPEG:(http://www.ffmpeg.org)  