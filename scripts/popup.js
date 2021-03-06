// присвоим перемменым элементы формы: 
//popup, кнопку редактирования профиля, кнопку закрытия формы, саму форму,
// имя профиля, описание профиля, input для вода имени, input для ввода описания
let popup;
let profileEdit = document.querySelector('.profile__edit');
// const addPopup = document.querySelector('.add-popup');
const popupAddButton = document.querySelector('.profile__add-button');
let popupCloseButtons = document.querySelectorAll('.popup__close-button');
let popupSaveButton = document.querySelector('.popup__container');
let popupCreateElement = document.querySelector('.add-form')
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('.element-template').content;

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

const popupsButton = [
  {
    'profile__add-button': '.add-popup'
  },
  {
    'profile__edit': '.edit-popup'
  }
]

//Метож для инициализации первых шести карточек

function renderDefaultElements () {
  initialCards.forEach (item => {  
    let element = createElemnt(item.name, item.link);
    elementsList.append(element);
  })
}
 
//метод открытия popup-a
function openPopup (evt) {
  let popupClass = popupsButton.find(item => {
    if(item[evt.target.className])
      return item[evt.target.className]
  })
  popup = document.querySelector(popupClass[evt.target.className]);
  popup.classList.add('popup_opened');
  let inputName = popup.querySelector('.popup__input_purpose_name');
  let inputDescription = popup.querySelector('.popup__input_purpose_description');
  if(evt.target.className === 'profile__edit') {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  } else {
    inputName.value = '';
    inputDescription.value = '';
  }
}

//метод для обработки отправки формы
function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

//метод закрытия формы
function closePopup () {
  popup.classList.remove('popup_opened');
}

//метод для обработки отправки формы добавления карточки
function saveAddForm (evt) {
  evt.preventDefault();
  const elementForm = document.querySelector('.add-form');
  const elementName = elementForm.querySelector('.popup__input_purpose_name').value;
  let element = createElemnt(elementForm.querySelector('.popup__input_purpose_name').value, 
    elementForm.querySelector('.popup__input_purpose_description').value);
  elementsList.prepend(element);
  closePopup();
}

// метод создания элемента новой карточки
function createElemnt(name, link) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__name').textContent = name;
  element.querySelector('.element__image').src = link;
  return element
}

//вызываем фунцию рендера для первых 6 элементов
renderDefaultElements();
// вешаем обработчик событие на нажатие кнопки редактирования профиля
profileEdit.addEventListener('click', openPopup);
//вешаем обработчик событие на нажатие кнопки добавления карточки
popupAddButton.addEventListener('click', openPopup);
// вешаем обработчик событие на отправку формы
popupSaveButton.addEventListener('submit', saveForm);
// вешаем обработчик событие на закрытие формы
popupCloseButtons.forEach( item => item.addEventListener('click', closePopup));
// вешаем обработчик на событие отправки формы добавления карточки
popupCreateElement.addEventListener('submit', saveAddForm);