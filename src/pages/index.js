import Card from '../component/Card.js';
import FormValidator from '../component/FormValidator.js';
import {objFormParams} from '../utils/constants.js';
import Section from '../component/Section.js';
import PopupWithImage from '../component/PopupWithImage.js';
import PopupWithForm from '../component/PopupWithform.js';
import PopupDelete from '../component/PopupDelete.js';
import UserInfo from '../component/UserInfo.js';
import Api from '../component/Api.js';
import './index.css';


const profileEdit = document.querySelector('.profile__edit');
const popupAddButton = document.querySelector('.profile__add-button');
const avatar = document.querySelector('.profile__avatar');

// создаем экземпляр класса Api для отпарвки запросов на сервер
const api = new Api({url: 'https://mesto.nomoreparties.co/v1/cohort-23'});
// создание popup-а для откртия карточек места
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

//создание popup-а для удаления карточки
const popupDelete = new PopupDelete('.popup_type_delete', api.delete.bind(api));
popupDelete.setEventListeners();

//метод для создания карточек
const createCard = (item) => {
  const card = new Card(item, '.element-template', {
    openPopupDelete: popupDelete.open.bind(popupDelete), 
    openPopupImage: popupWithImage.open.bind(popupWithImage),
    putLike: api.put.bind(api),
    deleteLike: api.delete.bind(api)
  });
  card.renderDeletIcon(userInfo.getUserId())
  section.addItem(card.getElement());
}

// создаем экземпляр класса  для управления данными пользователя
const userInfo = new UserInfo({name: '.profile__name', description: '.profile__description', avatar: '.profile__avatar'});
// создаем экземпляр класса  для инициализации карточек места
const section = new Section(createCard, '.elements__list', api.get.bind(api));

// запрашиваем информацию о пользваотеле
api.get('users/me').then((data) => {
  userInfo.setUserInfo(data);
  section.renderItems();
})
// создание popup-а для редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_edit', (inputValues) => {
  popupEditForm.changeButtonName(true);
  const data = {name: inputValues['element-name'], about: inputValues['element-link']};
  userInfo.setUserInfo(data);
  api.patch( 'users/me', 
    JSON.stringify({
      name: data.name,
      about: data.about
    })
  )
  .then((data) => {
    userInfo.setUserInfo(data);
    popupEditForm.changeButtonName(false);
    popupEditForm.close();
  })
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
  popupEditForm.open();
  profileValidator.toggleButtonState();
});

// создание popup-а для добавления нового места
const popupAddForm = new PopupWithForm('.popup_type_add', (inputValues) => {
  popupAddForm.changeButtonName(true);
  const data = {'name': inputValues['profileEditor-name'], 'link': inputValues['profileEditor-description']};
    api.post(
      JSON.stringify({
        name: data.name,
        link: data.link
      })
    )
    .then((response) => {
      createCard(response);
      popupAddForm.changeButtonName(false);
      popupAddForm.close();
    });
});
const addCardValidator = new FormValidator(objFormParams, popupAddForm.getPopupForm());
addCardValidator.enableValidation();

popupAddForm.setEventListeners();
popupAddButton.addEventListener('click', () => {
  popupAddForm.open();
  addCardValidator.toggleButtonState();
});

// создание popup-а для редактирования аватара
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (inputValues) => {
  popupEditAvatar.changeButtonName(true);
  const data = {avatar: inputValues['avatarEditor-link']};
  api.patch('users/me/avatar', JSON.stringify({
    avatar: data.avatar
  }))
  .then((data) => {
    userInfo.setUserInfo(data);
    popupEditAvatar.changeButtonName(false);
    popupEditAvatar.close();
  });
});

const editAvatarValidator = new FormValidator(objFormParams, popupEditAvatar.getPopupForm());
editAvatarValidator.enableValidation();

popupEditAvatar.setEventListeners();

avatar.addEventListener('click', () => {
  popupEditAvatar.open();
  editAvatarValidator.toggleButtonState();
});