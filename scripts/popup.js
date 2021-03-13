// присвоим перемменым элементы формы: 
//popup, кнопку редактирования профиля, кнопку закрытия формы, саму форму,
// имя профиля, описание профиля, input для вода имени, input для ввода описания
let inputName, inputDescription, elementImage, elementName;
const profileEdit = document.querySelector('.profile__edit');
const popupAddButton = document.querySelector('.profile__add-button');
const popupSaveButton = document.querySelector('.popup__container');
const popupCreateElement = document.querySelector('.popup__container_type_add');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('.element-template').content;
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseButtonEdit = popupTypeEdit.querySelector('.popup__close-button');

const popupTypeAdd = document.querySelector('.popup_type_add');
const popupCloseButtonAdd = popupTypeAdd.querySelector('.popup__close-button');

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

//Метож для инициализации первых шести карточек
function renderDefaultElements () {
  let element;
  initialCards.forEach (item => {  
    element = createElemnt(item.name, item.link);
    elementsList.append(element);
  })
}

// метод настраивает popup при его открытии
function openPopupForm (popup) {
  inputName = popup.querySelector('.popup__input_purpose_name');
  inputDescription = popup.querySelector('.popup__input_purpose_description');
  
  if(popup.className.includes('popup_type_edit')) {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  }

  if(popup.className.includes('popup_type_add')) {
    inputName.value = '';
    inputDescription.value = '';
  }
  openPopup(popup);
}

function openPopupImage(imageLink,  imageName) {
    popupImage.src = imageLink;
    popupFigcaption.textContent = imageName;
    openPopup(popupTypeImage);
}

//метод открытия popup-a
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

//метод для обработки отправки формы
function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupTypeEdit);
}

//метод закрытия формы
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//метод для обработки отправки формы добавления карточки
function saveAddForm (evt) {
  evt.preventDefault();
  let element = createElemnt(inputName.value, inputDescription.value);
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
  let element = evt.target.closest('.element');
  element.remove();
}

//вызываем фунцию рендера для первых 6 элементов
renderDefaultElements();
// вешаем обработчик событие на нажатие кнопки редактирования профиля
profileEdit.addEventListener('click', () => openPopupForm(popupTypeEdit));
//обработчик события закрытия формы редактирования профиля
popupCloseButtonEdit.addEventListener('click', () => closePopup(popupTypeEdit));
//вешаем обработчик событие на нажатие кнопки добавления карточки
popupAddButton.addEventListener('click', () => openPopupForm(popupTypeAdd));
//обработчик события закрытия формы добавления карточки
popupCloseButtonAdd.addEventListener('click', () => closePopup(popupTypeAdd));
// вешаем обработчик событие на отправку формы
popupSaveButton.addEventListener('submit', saveForm);
// вешаем обработчик событие на закрытие формы
//обработчик события закрытия формы редактирования профиля
popupCloseButtonsImage.forEach(item => item.addEventListener('click', () => closePopup(popupTypeImage)));
// вешаем обработчик на событие отправки формы добавления карточки
popupCreateElement.addEventListener('submit', saveAddForm);
//вешаем обработчик на нажатие кнопки Like

