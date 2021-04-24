import { ESC_CODE } from '../utils/constants.js';

export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // метод открытия popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose)
  }

  // метод закрытия popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  // метод закртия popup через кнопку ESC
  _handleEscClose(evt) {
    if(evt.keyCode === ESC_CODE) {
      this.close();
    }
  }

  // навешиваем слушателей для popup
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if( evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }
}