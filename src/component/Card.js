export default class Card {
  constructor(data, templateSelector, methods) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._generateCard();
    this._openPopupImage = methods.openPopupImage;
    this._openPopupDelete = methods.openPopupDelete;
    this._addListenters();
    this._elementLikeCount.textContent = data.likes.length;
  }

  // метод генерирует елементы карточки
  _generateCard() {
    this._element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    this._element.querySelector('.element__name').textContent = this._name;
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLike = this._element.querySelector('.element__like');
    this._elementLikeCount = this._element.querySelector('.element__like-counter');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
  }

  //метод для обработки нажатия на кнопку Like
 _clickLike (evt) {
    evt.target.classList.toggle('element__like_active');
  }

    //метод обработки удаления карточки
  _deleteElement (evt) {
    this._openPopupDelete(evt);
  }

  // метод навешивает слушателей на события карточки места
  _addListenters() {
    this._elementImage.addEventListener('click', () => this._openPopupImage(this._link, this._name));
    this._elementLike.addEventListener('click', (evt) => this._clickLike(evt))
    this._elementDeleteButton.addEventListener('click', (evt) => this._deleteElement(evt));
  }

  //Метод возвращает элемент карточки
  getElement() {
    return this._element;
  }


}
