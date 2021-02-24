let popup = document.querySelector('.popup');

let profileEdit = document.querySelector('.profile__edit');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupSaveButton = document.querySelector('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input_purpose_name');
let inputDescription = document.querySelector('.popup__input_purpose_description');

profileEdit.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

popupCloseButton.addEventListener('click', closePopup);

popupSaveButton.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = "";
  profileDescription.textContent = "";
  profileName.insertAdjacentText('afterbegin', inputName.value);
  profileDescription.insertAdjacentText('afterbegin', inputDescription.value);
  closePopup();
});

function closePopup () {
  popup.classList.remove('popup_opened');
}