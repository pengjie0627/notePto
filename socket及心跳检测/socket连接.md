1、如何使用h5的websocket?
```
<script type="text/javascript">
         function WebSocketTest(){
            if ("WebSocket" in window) {
               // 打开一个 web socket
               var ws = new WebSocket("ws://localhost:9998/echo");
               ws.onopen = function(){
                  // Web Socket 已连接上，使用 send() 方法发送数据
                  ws.send("发送数据");
                  alert("数据发送中...");
               };
               ws.onmessage = function (evt) { 
                  var received_msg = evt.data;
                  alert("数据已接收...");
               };
               ws.onclose = function(){ 
                  // 关闭 websocket
                  alert("连接已关闭..."); 
               };
            } else {
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
         }
      </script>
```
2、如何检测socket是否断开连接？
```
    // 定期检查连接状态
        setInterval(function() {
          if (socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
            console.log('Socket is closed or in the process of closing');
          }
        }, 1000);
```