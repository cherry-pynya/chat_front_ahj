/* eslint-disable class-methods-use-this */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import Socket from './ws';
import { messageFactory, userMessageFactoty } from './messageFactory';

export default class Chat {
  constructor(el, server) {
    if (typeof (el) === 'string') {
      this.element = document.querySelector(el);
    } else {
      this.element = el;
    }
    this.nameForm = this.element.querySelector('.name-form');
    this.chatForm = this.element.querySelector('.chat-form');

    this.nameSubmit = this.nameSubmit.bind(this);
    this.sentMessage = this.sentMessage.bind(this);

    this.nameForm.addEventListener('submit', this.nameSubmit);
    this.chatForm.addEventListener('submit', this.sentMessage);

    this.socket = new Socket(server, this);
  }

  nameSubmit(e) {
    e.preventDefault();
    this.toggleForm();
    this.user = {
      type: 'userName',
      name: this.nameForm.querySelector('.name-form-input').value,
      userId: uuidv4(),
      loginTime: `${moment().format('L')} ${moment().format('LT')}`,
    };
    this.socket.ws.send(JSON.stringify(this.user));
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
      text: this.chatForm.querySelector('.chat-form-input').value,
      messageId: uuidv4(),
      time: `${moment().format('L')} ${moment().format('LT')}`,
      userId: this.user.userId,
      messager: this.user.name,
    }));
    this.chatForm.querySelector('.chat-form-input').value = '';
  }

  showMesage(obj) {
    let msg;
    if (this.user.userId === obj.userId) {
      msg = userMessageFactoty(obj);
    } else {
      msg = messageFactory(obj);
    }
    document.querySelector('.chat-messages').insertAdjacentHTML('beforeend', msg);
  }
}
