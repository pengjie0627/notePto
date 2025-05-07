1、什么是FLV?
```
FLV.js 是一个强大的工具，适合需要在网页上播放 FLV 视频流的应用程序
```
2、FLV工作原理?
```
【1】初始化：通过 JavaScript 创建一个 FlvPlayer 实例，并指定视频容器元素。
【2】加载和解析 FLV 文件：flv.js 会从指定的 URL 加载 FLV 文件，并开始解析文件头、标签等信息。
【3】解码视频和音频：根据解析出的数据块，进行视频和音频的解码。这一步可能涉及到复杂的算法处理，如 H.264 视频解码或 AAC 音频解码。
【4】渲染：解码后的帧被发送到浏览器的画布上渲染显示。
【5】事件处理：处理如播放、暂停、停止等事件，并通过回调函数通知开发者。
【6】流控制：根据网络情况和媒体播放状态动态调整播放速度和缓冲策略，确保流畅播放
```
3、FLV优点？
```
[1]无需 Flash Player：FLV.js 允许在不需要 Adobe Flash Player 的情况下播放 FLV 视频，这对于现代网页开发非常重要，因为 Adobe 已经停止了对 Flash Player 的支持。
[2]跨浏览器兼容性：通过使用 HTML5 的 Media Source Extensions，FLV.js 支持多种现代浏览器，包括 Chrome、Firefox、Safari 和 Edge。
[3]低延迟：FLV.js 可以提供接近原生视频播放的低延迟，这对于需要实时视频流的应用（如直播和视频会议）尤其重要。
[4]灵活的流控制：用户可以更容易地控制视频流，例如调整播放速度、暂停和恢复播放等。
[5]开源：FLV.js 是开源的，这意味着开发者可以自由地查看、修改和分发代码，有助于定制和优化以满足特定的需求。

```
4、FLV缺点？
```
[1]兼容性问题：尽管 FLV.js 支持多种现代浏览器，但在一些老旧或特定环境（如某些移动设备或特定版本的浏览器）中可能仍存在兼容性问题。
[2]资源占用：在某些情况下，使用 MSE 播放视频可能会比传统的 <video> 标签消耗更多的 CPU 和内存资源，尤其是在处理高分辨率或高码率的视频流时。
[3]有限的格式支持：虽然 FLV.js 支持 FLV 格式，但它不支持其他视频格式如 MP4 或 WebM。这可能在需要多格式支持的应用场景中造成限制。
```
5、实现

[1]获取video元素
```
const FLV_PlayerOnPage = document.getElementById(elementID);
```
[2]定义HLS流媒体URL
```
const streamUrl = `http://example.com/path/to/video.flv`;
```
[3]初始化HLS实例
```
var flvPlayer = flvjs.createPlayer({
  type: 'flv',
  url: streamUrl
});
```
[4]绑定video标签
```
flvPlayer.attachMediaElement(videoElement);
```
[5]加载资源
```
 flvPlayer.load();
```
[7]处理播放开始：
```
flvPlayer.play();
```