import Card from '../component/Card.js';
import FormValidator from '../component/FormValidator.js';
import {initialCards, objFormParams} from '../utils/constants.js';
import Section from '../component/Section.js';
import PopupWithImage from '../component/PopupWithImage.js';
import PopupWithForm from '../component/PopupWithform.js';
import UserInfo from '../component/UserInfo.js';
import './index.css';

const profileEdit = document.querySelector('.profile__edit');
const popupAddButton = document.querySelector('.profile__add-button');

// создание popup-а для откртия карточек места
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

//метод для создания карточек
const createCard = (item) => {
  const card = new Card(item, '.element-template', popupWithImage.open.bind(popupWithImage));
  section.addItem(card.getElement());
}

// создаем экземпляр класса  для инициализации карточек места
const section = new Section(createCard, '.elements__list');

section.renderItems('https://mesto.nomoreparties.co/v1/cohort-23/cards');

// создаем экземпляр класса  для управления данными пользователя
const userInfo = new UserInfo({name: '.profile__name', description: '.profile__description', avatar: '.profile__avatar'});

// создание popup-а для редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_edit', (inputValues) => {
  const data = {name: inputValues['element-name'], about: inputValues['element-link']};
  userInfo.setUserInfo(data);
  popupEditForm.fetchNewData({method: 'PATCH', url: 'https://mesto.nomoreparties.co/v1/cohort-23/users/me'}, 
    JSON.stringify({
      name: data.name,
      about: data.about
    })
  );
  popupEditForm.close()
});
const profileValidator = new FormValidator(objFormParams, popupEditForm.getPopupForm());
profileValidator.enableValidation();

popupEditForm.setEventListeners();

profileEdit.addEventListener('click', () => {
  const userInfoFoForm = {};
  const info = userInfo.getUserInfo();
  userInfoFoForm['element-name'] = info.name;
  userInfoFoForm['element-link'] = info.description;
  popupEditForm.setInputValues(userInfoFoForm);
  // popupEditForm.setSubmitData()
  popupEditForm.open();
  profileValidator.toggleButtonState();
});

// создание popup-а для добавления нового места
const popupAddForm = new PopupWithForm('.popup_type_add', (inputValues) => {
  const data = {'name': inputValues['profileEditor-name'], 'link': inputValues['profileEditor-description']};
  const card = new Card(data, '.element-template', popupWithImage.open.bind(popupWithImage));
    section.addItem(card.getElement());
    popupAddForm.fetchNewData({method: 'POST', url: 'https://mesto.nomoreparties.co/v1/cohort-23/cards'}, 
      JSON.stringify({
        name: data.name,
        link: data.link
      })
    )
    popupAddForm.close();
});
const addCardValidator = new FormValidator(objFormParams, popupAddForm.getPopupForm());
addCardValidator.enableValidation();

popupAddForm.setEventListeners();
popupAddButton.addEventListener('click', () => {
  popupAddForm.open();
  addCardValidator.toggleButtonState();
});