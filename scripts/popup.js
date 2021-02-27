// присвоим перемменым элементы формы: 
//popup, кнопку редактирования профиля, кнопку закрытия формы, саму форму,
// имя профиля, описание профиля, input для вода имени, input для ввода описания
let popup = document.querySelector('.popup');

let profileEdit = document.querySelector('.profile__edit');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupSaveButton = document.querySelector('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input_purpose_name');
let inputDescription = document.querySelector('.popup__input_purpose_description');

//метод открытия popup-a
function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
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

// вешаем обработчик события на нажатие кнопки редактирования профиля
profileEdit.addEventListener('click', openPopup);
// вешаем обработчик события на отправку формы
popupSaveButton.addEventListener('submit', saveForm);
// вешаем обработчик события на закрытие формы
popupCloseButton.addEventListener('click', closePopup);