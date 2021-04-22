import { ESC_CODE } from './constants.js';

export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  // метод открытия popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt)
    })
  }

  // метод закрытия popup
  close() {
    this._popup.classList.remove('popup_opened');
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