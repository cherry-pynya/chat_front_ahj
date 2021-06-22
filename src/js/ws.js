/* eslint-disable no-restricted-globals */
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
    this.ws.addEventListener('close', (e) => {
      this.onClose(e, this.app);
    });
  }

  onOpen() {
    console.log('user conected');
  }

  onMessage(evt, app) {
    if (evt.data) {
      const data = JSON.parse(evt.data);
      if (data.type === 'message') {
        app.showMesage(data);
      }
      if (data.type === 'general') {
        document.querySelector('.chat-members-container').textContent = '';
        document.querySelector('.chat-messages').textContent = '';
        data.users.forEach((el) => {
          app.showUser(el);
        });
        data.messages.forEach((el) => {
          app.showMesage(el);
        });
      }
    }
  }

  onClose(evt, app) {
    app.loginTaken(evt.reason);
  }
}
