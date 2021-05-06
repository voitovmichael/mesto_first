import Popup from "./Popup.js";
import {token} from '../utils/constants.js'
export default class PopupDelete extends Popup {
  constructor(selector, fetchDelete) {
    super(selector);
    this._popupConfirm = this._popup.querySelector('.popup__confirm');
    this._fetchDelete = fetchDelete;
  }

  deleteCard() {
    this._fetchDelete('cards', this._cardId)
    .then((data) => {
      this._card.remove();
      super.close();
    })
  }

  open(evt, id) {
    this._card = evt.target.closest('.element');
    this._cardId = id;
    super.open();
  }

  setEventListeners() {
    this._popupConfirm.addEventListener('click', this.deleteCard.bind(this))
  }

}