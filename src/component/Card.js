export default class Card {
  constructor(data, templateSelector, methods) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._generateCard();
    this._openPopupImage = methods.openPopupImage;
    this._openPopupDelete = methods.openPopupDelete;
    this._putLike = methods.putLike;
    this._deleteLike = methods.deleteLike;
    this._addListenters();
    if(data.likes) {
      this._elementLikeCount.textContent = data.likes.length;
    }
    if(data.owner) {
      this._ownerCardId = data.owner._id;
    }
    if(data._id) {
      this._id = data._id;
    }
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
   if(!evt.target.classList.contains('element__like_active')) {
     this._putLike(this._id).then((data) => {
       evt.target.classList.add('element__like_active');
       this._elementLikeCount.textContent = data.likes.length;
     });
   } else {
    this._deleteLike('cards/likes',this._id).then((data) => {
      evt.target.classList.remove('element__like_active');
      this._elementLikeCount.textContent = data.likes.length;
    });
   }
    // evt.target.classList.toggle('element__like_active');
  }

    //метод обработки удаления карточки
  _deleteElement (evt) {
    this._openPopupDelete(evt, this._id);
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

  //метод отрисовывает иконку удаления карточки
  renderDeletIcon(userId) {
    if(userId === this._ownerCardId || !this._ownerCardId) {
      this._elementDeleteButton.classList.add('popup__close-button_active');
    }
  }

}
