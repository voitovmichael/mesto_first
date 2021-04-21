import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selector) {
    super(selector);
    this._popupImage = document.querySelector('.popup__image');
    this._popupFigcaption = document.querySelector('.popup__figcaption');
  }

  // переопределяем метод открытия popup
  open(imageLink, imageName) {
    this._popupImage.src = imageLink;
    this._popupFigcaption.alt = imageName;
    this._popupFigcaption.textContent = imageName;
    super.open();
  }
}