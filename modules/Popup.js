import { ESC_CODE } from './constants.js';

export default class Popup {
  constructor(selector) {
    // this._selector = selector;
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt)
    })
    // document.addEventListener('keyup', (evt) => closeOverlayByEsc(evt, popup));
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if(evt.keyCode === ESC_CODE) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if( evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }
}