import Socket from './ws';

export default class Chat {
  constructor(el, server) {
    if (typeof (el) === 'string') {
      this.element = document.querySelector(el);
    } else {
      this.element = el;
    }
    this.ws = new Socket(server);
    this.nameForm = this.element.querySelector('.name-form');

    this.nameSubmit = this.nameSubmit.bind(this);

    this.nameForm.addEventListener('submit', this.nameSubmit);
  }

  nameSubmit(e) {
    e.preventDefault();
    this.toggleForm();
  }

  toggleForm() {
    this.nameForm.classList.toggle('invalid');
    this.nameForm.closest('.modal').classList.toggle('invalid');
  }
}
