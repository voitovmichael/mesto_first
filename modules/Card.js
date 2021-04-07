export default class Card {
  constructor(data, templateSelector, openPopupImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getCardElement();
    this._elementImage = this._getCardImage(this._link, this._name);
    this._openPopupImage = openPopupImage;
    this._addListenters();
  }

  //метод возвращает шаблон изображения места
  _getCardImage(link, name) {
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = link;
    elementImage.alt = name;
    return elementImage;
  }

  // метод возвращает шаблон карточки места
  _getCardElement() {
    const element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    element.querySelector('.element__name').textContent = this._name;
    return element;
  }

  //метод для обработки нажатия на кнопку Like
 _clickLike (evt) {
    evt.target.classList.toggle('element__like_active');
  }

    //метод обработки удаления карточки
  _deleteElement (evt) {
    const element = evt.target.closest('.element');
    element.remove();
  }

  // метод навешивает слушателей на события карточки места
  _addListenters() {
    // const elementImage = this._element.querySelector('.element__image');
    this._elementImage.addEventListener('click', () => this._openPopupImage(this._link, this._name));
    this._element.querySelector('.element__like').addEventListener('click', (evt) => this._clickLike(evt))
    this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => this._deleteElement(evt));
  }

  //Метод возвращает элемент карточки
  getElement() {
    return this._element;
  }

}
