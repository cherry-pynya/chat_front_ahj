/* eslint-disable class-methods-use-this */
export default class Socket {
  constructor(server, app) {
    this.ws = new WebSocket(server);
    this.ws.binaryType = 'blob';
    this.app = app;

    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('message', (e) => {
      this.onMessage(e, this.app);
    });
    this.ws.addEventListener('close', this.onClose);
    this.ws.addEventListener('error', this.onError);
  }

  onOpen() {
    console.log('conected');
  }

  onMessage(evt, app) {
    if (evt.data) {
      const data = JSON.parse(evt.data);
      console.log(data);
      if (data.type === 'message') {
        app.showMesage(data);
      }
      if (data.type === 'general') {
        data.messages.forEach((el) => {
          app.showMesage(el);
        });
      }
    }
  }

  onClose(evt) {
    console.log(evt);
  }

  onError() {
    console.log('error');
  }
}
