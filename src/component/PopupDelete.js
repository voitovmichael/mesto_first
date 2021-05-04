import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(selector) {
    super(selector);
    this._popupConfirm = this._popup.querySelector('.popup__confirm');
  }

  deleteCard(evt) {
    this._deleteCard.remove();
    super.close();
  }

  open(evt) {
    this._deleteCard = evt.target.closest('.element');
    super.open();
  }

  setEventListeners() {
    this._popupConfirm.addEventListener('click', this.deleteCard.bind(this))
  }

}