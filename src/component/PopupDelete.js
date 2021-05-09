import Popup from "./Popup.js";
export default class PopupDelete extends Popup {
  constructor(selector, fetchDelete, ESC_CODE) {
    super(selector, ESC_CODE);
    this._fetchDelete = fetchDelete;
    this._buttonConfirm = this._popup.querySelector('.popup__confirm');
    this._buttonConfirmText = this._buttonConfirm.textContent;
  }

  _reject(err) {
    this.changeButtonName(false);
    console.log(err);
  }

  deleteCard() {
    this.changeButtonName(true);
    this._fetchDelete(this._cardId)
    .then((data) => {
      this._card.remove();
      this.changeButtonName(false);
      super.close();
    })
    .catch(this._reject.bind(this))
  }

  open(evt, id) {
    this._card = evt.target.closest('.element');
    this._cardId = id;
    super.open();
  }

  setEventListeners() {
    this._buttonConfirm.addEventListener('click', this.deleteCard.bind(this));
    super.setEventListeners();
  }
  
  //метод для отображения процесса запроса на сервер
  changeButtonName(isRequest) {
    this._buttonConfirm.textContent = isRequest ? 'Удаление...' : this._buttonConfirmText;
  }

}