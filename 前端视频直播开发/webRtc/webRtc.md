1、什么是webRtc?
```
WebRTC（Web Real-Time Communication）是一项实时通信技术，它允许 Web 浏览器之间进行实时的音频、视频和数据传输，无需安装任何插件。
这项技术为 Web 应用开发者提供了强大的工具，使得在网页上实现视频通话、屏幕共享、文件传输等实时交互功能变得轻而易举，
极大地拓展了 Web 应用的功能边界。
```
2、webRtc工作原理?
```

```
3、webRtc优点？
```
[1]直接在浏览器中运行：WebRTC不需要额外的插件或客户端软件，用户可以直接在支持WebRTC的浏览器中使用它，这使得部署和维护变得更加简单。
[2]低延迟和高质量：WebRTC优化了音视频传输的延迟和带宽使用，提供了高质量的实时通信体验。
[3]安全性：WebRTC支持端到端的加密（SRTP和DTLS），确保了数据传输的安全性。
[4]跨平台兼容性：WebRTC支持多种操作系统和浏览器，包括Chrome、Firefox、Safari和Edge等，具有很好的跨平台兼容性。
[5]易于集成：WebRTC的API设计得相对简单，容易集成到现有的Web应用程序中，不需要复杂的后端服务。
```
4、webRtc缺点？
```
[1]兼容性问题：尽管大多数现代浏览器都支持WebRTC，但在一些老旧或特定的环境中可能存在兼容性问题。这需要开发者进行一定的测试和适配工作。
[2]有限的NAT穿越能力：网络地址转换（NAT）穿透是WebRTC实现的一个重要问题。某些网络配置可能会阻碍WebRTC的直接连接，需要使用TURN或STUN服务器来解决。
[3]带宽和性能限制：虽然WebRTC优化了带宽使用，但在高带宽需求或网络不稳定的情况下，可能会遇到性能瓶颈。
```
5、实现

[1]创建本地和远程两个video标签
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebRTC Video Call</title>
</head>
<body>
    <h1>WebRTC Video Call</h1>
    <video id="localVideo" autoplay muted></video>
    <video id="remoteVideo" autoplay></video>
    <script src="app.js"></script>
</body>
</html>
```
[2]获取媒体流并设置本地视频显示
```
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
 
// 获取媒体流
async function getMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = stream;
    return stream;
}
```
[3]创建RTCPeerConnection并处理信令(你需要创建一个RTCPeerConnection对象，并通过信令服务器交换SDP和ICE候选信息。这里我们使用WebSocket作为信令服务器的一个简单示例。)
```
let peerConnection;
let localStream;
const signalingServerUrl = 'wss://your-signaling-server-url'; // 替换为你的信令服务器URL
const socket = new WebSocket(signalingServerUrl);
 
socket.onmessage = async (message) => {
    const data = JSON.parse(message.data);
    if (data.type === 'offer') {
        await setRemoteDescription(data.sdp);
        await createAnswer();
    } else if (data.type === 'answer') {
        await setRemoteDescription(data.sdp);
    } else if (data.type === 'candidate') {
        await addIceCandidate(data.candidate);
    }
};
 
function createPeerConnection() {
    peerConnection = new RTCPeerConnection();
    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
        }
    };
}
```
[4]设置和发送SDP信息
```
async function createOffer() {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.send(JSON.stringify({ type: 'offer', sdp: offer }));
}
 
async function createAnswer() {
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.send(JSON.stringify({ type: 'answer', sdp: answer }));
}
```
[5]处理远程SDP和ICE候选信息
```
async function setRemoteDescription(sdp) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
}
 
async function addIceCandidate(candidate) {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}
```
[6]初始化连接和媒体流获取
```
window.onload = async () => {
    localStream = await getMedia(); // 获取媒体流并显示本地视频。
    createPeerConnection(); // 创建RTCPeerConnection。
    peerConnection.addStream(localStream); // 将本地媒体流添加到连接中。
    createOffer(); // 创建并发送offer。 对方将收到此offer，并创建answer。 之后交换候选信息。 完成连接。 对方也将看到本地视频。 你可以通过信令服务器交换这些信息。 确保你的信令服务器能够正确转发这些信息。 你可以使用WebSocket或其他实时通信机制如Signal
```