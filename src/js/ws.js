export default class Socket {
  constructor(server) {
    this.ws = new WebSocket(server);
    this.ws.binaryType = 'blob';

    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('message', this.onMessage);
    this.ws.addEventListener('close', this.onClose);
    this.ws.addEventListener('error', this.onError);
  }

  onOpen() {
    console.log('conected')
  }

  onMessage(evt) {
    console.log(evt)
  }

  onClose(evt) {
    console.log(evt);
  }

  onError() {
      console.log('error')
  }
}
