import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
  constructor(selector, ESC_CODE) {
    super(selector, ESC_CODE);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

  // переопределяем метод открытия popup
  open(imageLink, imageName) {
    this._popupImage.src = imageLink;
    this._popupFigcaption.alt = imageName;
    this._popupFigcaption.textContent = imageName;
    super.open();
  }

    //метод для отображения процесса запроса на сервер
    changeButtonName(isRequest) {
      this._buttonConfirm.textContent = isRequest ? 'Сохранение...' : this._buttonConfirmText;
    }

}