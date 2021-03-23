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
const elementTemplate = document.querySelector('.element-template').content;
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseButtonEdit = popupTypeEdit.querySelector('.popup__close-button');
const profileNameInput = popupTypeEdit.querySelector('.popup__input_purpose_name');
const profileDescriptionInput = popupTypeEdit.querySelector('.popup__input_purpose_description');

const popupTypeAdd = document.querySelector('.popup_type_add');
const popupCloseButtonAdd = popupTypeAdd.querySelector('.popup__close-button');
const placeNameInput = popupTypeAdd.querySelector('.popup__input_purpose_name');
const placeLinkInput = popupTypeAdd.querySelector('.popup__input_purpose_description');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseButtonsImage = popupTypeImage.querySelectorAll('.popup__close-button');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Краснодар',
    link: './images/elements/Galickii-park.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const objFormParams = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
}

//методы для валидации формы
const showError = (formElement, inputElement) => {
  inputElement.classList.add('popup__input_error');
  const errorElemnt = formElement.querySelector(`.${inputElement.name}-placeholder`);
  errorElemnt.textContent = inputElement.validationMessage;
  errorElemnt.classList.add('popup__input-error_active');
  
}

const hideError = (formElement, inputElement) => {
  inputElement.classList.remove('popup__input_error');
  const errorElemnt = formElement.querySelector(`.${inputElement.name}-placeholder`);
  errorElemnt.classList.remove('popup__input-error_active');
}

const checkInputInValid = (inputElement) => {
  return !inputElement.validity.valid
}

// метод управляет активностью кнопки формы в зависимости от заполненности её input-ов
const toggleButtonState = (formSaveButton, inputList) => {
  let isInputvalid = !inputList.some((inputElement) => {
    return checkInputInValid(inputElement);
  });
  if(isInputvalid) {
    formSaveButton.classList.add('popup__save_active');
    formSaveButton.removeAttribute('disabled');
  }
  else {
    formSaveButton.classList.remove('popup__save_active');
    formSaveButton.setAttribute('disabled', true);
  }

}

// метод навешивает слушателя с событием input на форму
const setEventListener = (formElement, submitButtonSelector, inputSelector) => {
  const formSaveButton = formElement.querySelector(submitButtonSelector);
  const inputElementList = Array.from(formElement.querySelectorAll(inputSelector));
  formElement.addEventListener('input', (evt) => {
    if(evt.target.classList.value.includes('popup__input')) {
      checkInputInValid(evt.target) ? showError(formElement, evt.target) : hideError(formElement, evt.target);
      toggleButtonState(formSaveButton, inputElementList);
    }
  });
  // const formSaveButton = formElement.querySelector('.popup__save');

}

// проверяем список input-ов на валидность
const checkFormElements = (formElement, submitButtonSelector, inputSelector) => {
    const formSaveButton = formElement.querySelector(submitButtonSelector);
    const inputElementList = Array.from(formElement.querySelectorAll(inputSelector));
    if(inputElementList.length > 0) {
      // checkAllInputElements(formElement, inputElementList);
      inputElementList.forEach((inputElement) => {
        checkInputInValid(inputElement) ? showError(formElement, inputElement) : hideError(formElement, inputElement);
      });
      toggleButtonState(formSaveButton, inputElementList);
}
}

const enableValidation = ({formSelector, submitButtonSelector, inputSelector}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // const formSaveButton = formElement.querySelector(submitButtonSelector);
    // const inputElementList = Array.from(formElement.querySelectorAll(inputSelector));
    // if(inputSelector && inputElementList.length > 0) {
      checkFormElements(formElement, submitButtonSelector, inputSelector);
      // inputElementList.forEach((inputElement) => {
      //   checkInputInValid(inputElement) ? showError(formElement, inputElement) : hideError(formElement, inputElement);
      // })
      setEventListener(formElement, submitButtonSelector, inputSelector);
      
  });
}

const closeOverlayByClick = (evt, popup) => {
  const classList = Array.from(evt.target.classList);
  if(classList.includes('popup')){//|| evt.keyCode === 27) {//vt.keyCode: 27
    closePopup(popup);
  }
}

const closeOverlayByEsc = (evt, popup) => {
  if(evt.keyCode === 27)
    closePopup(popup);
}

//Метож для инициализации первых шести карточек
function renderDefaultElements () {
  let element;
  initialCards.forEach (item => {  
    element = createElemnt(item.name, item.link);
    elementsList.append(element);
  })
}

// метод настраивает popup при его открытии
function openPopupFormEdit (popup) {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  // const inputElementList = Array.from(popup.querySelector(objFormParams.inputSelector));
  // const formSaveButton = popup.querySelector(objFormParams.submitButtonSelector);
  const formElement = popup.querySelector(objFormParams.formSelector);
  checkFormElements(formElement, objFormParams.submitButtonSelector, objFormParams.inputSelector);
  // toggleButtonState(formSaveButton, inputElementList);
  openPopup(popup);
}

//метод обработки открытия формы редактирования профиля
function openPopupFormAdd (popup) {
  placeNameInput.value = '';
  placeLinkInput.value = '';
  const formElement = popup.querySelector(objFormParams.formSelector);
  checkFormElements(formElement, objFormParams.submitButtonSelector, objFormParams.inputSelector);
  openPopup(popup);
}

// метод для обработки окрытия формы добавления карточки
function openPopupImage(imageLink,  imageName) {
    popupImage.src = imageLink;
    popupFigcaption.textContent = imageName;
    openPopup(popupTypeImage);
}

//метод открытия popup-a
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', (evt) => closeOverlayByEsc(evt, popup));
}

//метод для обработки отправки формы
function saveEditForm(evt) {
  // evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupTypeEdit);
}

//метод закрытия формы
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//метод для обработки отправки формы добавления карточки
function saveAddForm (evt) {
  // evt.preventDefault();
  const element = createElemnt(placeNameInput.value, placeLinkInput.value);
  elementsList.prepend(element);
  closePopup(popupTypeAdd);
}

// метод создания элемента новой карточки
function createElemnt(name, link) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__name').textContent = name;
  const elementImage = element.querySelector('.element__image');
  elementImage.src = link;
  elementImage.alt = `Фото: ${name}`;
  elementImage.addEventListener('click', () => openPopupImage(link, name));
  element.querySelector('.element__like').addEventListener('click', clickLike)
  element.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  return element
}

//метод для обработки нажатия на кнопку Like
function clickLike (evt) {
  evt.target.classList.toggle('element__like_active');
}

//метод обработки удаления карточки
function deleteElement (evt) {
  const element = evt.target.closest('.element');
  element.remove();
}


//вызываем фунцию рендера для первых 6 элементов
renderDefaultElements();
enableValidation(objFormParams);

// вешаем обработчик событие на нажатие кнопки редактирования профиля
profileEdit.addEventListener('click', () => openPopupFormEdit(popupTypeEdit));
//обработчик события закрытия формы редактирования профиля
popupCloseButtonEdit.addEventListener('click', () => closePopup(popupTypeEdit));
//вешаем обработчик событие на нажатие кнопки добавления карточки
popupAddButton.addEventListener('click', () => openPopupFormAdd(popupTypeAdd));
//обработчик события закрытия формы добавления карточки
popupCloseButtonAdd.addEventListener('click', () => closePopup(popupTypeAdd));
// вешаем обработчик событие на отправку формы
editForm.addEventListener('submit', saveEditForm);
// вешаем обработчик событие на закрытие формы
//обработчик события закрытия формы редактирования профиля
popupCloseButtonsImage.forEach(item => item.addEventListener('click', () => closePopup(popupTypeImage)));
// вешаем обработчик на событие отправки формы добавления карточки
addForm.addEventListener('submit', saveAddForm);
//вешаем обработчик на нажатие по overlay
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => closeOverlayByClick(evt, popup));
  popup.addEventListener('keyup', (evt) => closeOverlayByEsc(evt, popup));
});

