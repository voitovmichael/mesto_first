import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {ESC_CODE, initialCards, objFormParams} from './constants.js';
import Section from './Section.js';
import Popup from './Popup.js';
// присвоим перемменым элементы формы:
//popup, кнопку редактирования профиля, кнопку закрытия формы, саму форму,
// имя профиля, описание профиля, input для вода имени, input для ввода описания
const popupList = Array.from(document.querySelectorAll('.popup'));
const profileEdit = document.querySelector('.profile__edit');
const popupAddButton = document.querySelector('.profile__add-button');
const editForm = document.querySelector('.popup__container_type_edit');
const addForm = document.querySelector('.popup__container_type_add');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileNameInput = popupTypeEdit.querySelector('.popup__input_purpose_name');
const profileDescriptionInput = popupTypeEdit.querySelector('.popup__input_purpose_description');

const popupTypeAdd = document.querySelector('.popup_type_add');
const placeNameInput = popupTypeAdd.querySelector('.popup__input_purpose_name');
const placeLinkInput = popupTypeAdd.querySelector('.popup__input_purpose_description');

const popupTypeImage = document.querySelector('.popup_type_image');

const closeOverlayByEsc = (evt, popup) => {
  if(evt.keyCode === ESC_CODE)
    closePopup(popup);
}


const checkForm = (popup) => {
  const formValidator = new FormValidator(objFormParams, popup);
  formValidator.enableValidation();
}

//Метож для инициализации первых шести карточек
// function renderDefaultElements () {
//   initialCards.forEach (item => {
//     const card = new Card(item, '.element-template', openPopupImage);
//     elementsList.append(card.getElement());
//   })
// }


// метод настраивает popup при его открытии
function openPopupFormEdit (popup) {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popup);
}

//метод обработки открытия формы редактирования профиля
function openPopupFormAdd (popup) {
  addForm.reset();
  openPopup(popup);
}

// метод для обработки окрытия формы добавления карточки
function openPopupImage(imageLink,  imageName) {
    popupImage.src = imageLink;
    popupImage.alt = imageName;
    popupFigcaption.textContent = imageName;
    openPopup(popupTypeImage);
}

//метод открытия popup-a
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', (evt) => closeOverlayByEsc(evt, popup));
  checkForm(popup);
}

//метод для обработки отправки формы
function saveEditForm() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupTypeEdit);
}
//метод закрытия формы
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', (evt) => closeOverlayByEsc(evt, popup));
  // checkForm(popup);
}

//метод для обработки отправки формы добавления карточки
function saveAddForm () {
  const card = new Card({'name': placeNameInput.value, 'link': placeLinkInput.value} , '.element-template', openPopupImage);
  elementsList.prepend(card.getElement());
  closePopup(popupTypeAdd);
}

//вызываем фунцию рендера для первых 6 элементов
// renderDefaultElements();

// вешаем обработчик событие на нажатие кнопки редактирования профиля
profileEdit.addEventListener('click', () => openPopupFormEdit(popupTypeEdit));
//вешаем обработчик событие на нажатие кнопки добавления карточки
popupAddButton.addEventListener('click', () => openPopupFormAdd(popupTypeAdd));
// вешаем обработчик событие на отправку формы
editForm.addEventListener('submit', saveEditForm);
// вешаем обработчик на событие отправки формы добавления карточки
addForm.addEventListener('submit', saveAddForm);
//вешаем обработчик на нажатие по overlay
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button'))
      closePopup(popup);
  });
});

const section = new Section({
  items: initialCards, 
  renderer: (item) => {
    // initialCards.forEach (item => {
    const card = new Card(item, '.element-template', openPopupImage);
    section.addItem(card.getElement());
  }}, '.elements__list');

  section.renderItems()

  const popup = new Popup('.popup_type_add');

  popup.open();