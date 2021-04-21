import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {ESC_CODE, initialCards, objFormParams} from './constants.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithform.js';
import UserInfo from './UserInfo.js';

const profileEdit = document.querySelector('.profile__edit');
const popupAddButton = document.querySelector('.profile__add-button');

// функция создает экземпляр класса FormValidator для валидации форм
const checkForm = (form) => {
  const formValidator = new FormValidator(objFormParams, form);
  formValidator.enableValidation();
}

// создание popup-а для откртия карточек места
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

// создаем экземпляр класса  для инициализации карточек места
const section = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, '.element-template', popupWithImage.open.bind(popupWithImage));
    section.addItem(card.getElement());
  }}, '.elements__list');

section.renderItems()

// создаем экземпляр класса  для управления данными пользователя
const userInfo = new UserInfo({name: '.profile__name', description: '.profile__description'});

// создание popup-а для редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_edit', (inputValues) => {
  debugger;
  userInfo.setUserInfo(inputValues['profileEditor-name'], inputValues['profileEditor-description']);
  popupEditForm.close()
});
popupEditForm.setEventListeners();
profileEdit.addEventListener('click', () => {
  popupEditForm.setInputValues(userInfo.getUserInfo());
  popupEditForm.open();
  checkForm(popupEditForm.getPopupForm());
});

// создание popup-а для добавления нового места
const popupAddForm = new PopupWithForm('.popup_type_add', (inputValues) => {
  const card = new Card({'name': inputValues['profileEditor-name'], 'link': inputValues['profileEditor-description']}, 
  '.element-template', popupWithImage.open.bind(popupWithImage));
    section.addItem(card.getElement());
    popupAddForm.close();
});
popupAddForm.setEventListeners();
popupAddButton.addEventListener('click', () => {
  popupAddForm.open();
  checkForm(popupAddForm.getPopupForm());
});