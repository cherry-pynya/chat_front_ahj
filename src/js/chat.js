import Socket from './ws';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default class Chat {
  constructor(el, server) {
    if (typeof (el) === 'string') {
      this.element = document.querySelector(el);
    } else {
      this.element = el;
    }
    this.socket = new Socket(server);
    this.nameForm = this.element.querySelector('.name-form');
    this.chatForm = this.element.querySelector('.chat-form');

    this.nameSubmit = this.nameSubmit.bind(this);
    this.sentMessage = this.sentMessage.bind(this);

    this.nameForm.addEventListener('submit', this.nameSubmit);
    this.chatForm.addEventListener('submit', this.sentMessage);
  }

  nameSubmit(e) {
    e.preventDefault();
    this.toggleForm();
    this.socket.ws.send(JSON.stringify({
      type: 'userName',
      body: this.nameForm.querySelector('.name-form-input').value,
    }));
    this.nameForm.querySelector('.name-form-input').value = '';
  }

  toggleForm() {
    this.nameForm.classList.toggle('invalid');
    this.nameForm.closest('.modal').classList.toggle('invalid');
  }

  sentMessage(e) {
    e.preventDefault();
    this.socket.ws.send(JSON.stringify({
      type: 'message',
      body: this.chatForm.querySelector('.chat-form-input').value,
      id: uuidv4(),
      time: `${moment().format('L')} ${moment().format('LT')}`,
    }));
    this.chatForm.querySelector('.chat-form-input').value = '';
  }
}
