
const objFormParams = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputError: 'popup__input_error',
  inputErrorActive: 'popup__input-error_active',
  saveButtonActive: 'popup__save_active'
}

//метод показывает предупреждение об ошибке в случае некорректного значения поля
const showError = (formElement, inputElement, {inputError, inputErrorActive}) => {
  inputElement.classList.add(inputError);
  const errorElemnt = formElement.querySelector(`.${inputElement.name}-placeholder`);
  errorElemnt.textContent = inputElement.validationMessage;
  errorElemnt.classList.add(inputErrorActive);
  
}

//метод скрывает предупреждение об ошибке
const hideError = (formElement, inputElement, {inputError, inputErrorActive}) => {
  inputElement.classList.remove(inputError);
  const errorElemnt = formElement.querySelector(`.${inputElement.name}-placeholder`);
  errorElemnt.classList.remove(inputErrorActive);
}

//метод проверяет поле формы на валидность
const checkInputInValid = (inputElement) => {
  return !inputElement.validity.valid
}

// метод управляет активностью кнопки формы в зависимости от заполненности её input-ов
const toggleButtonState = (formSaveButton, inputList, {saveButtonActive}) => {
  let isInputvalid = !inputList.some((inputElement) => {
    return checkInputInValid(inputElement);
  });
  if(isInputvalid) {
    formSaveButton.classList.add(saveButtonActive);
    formSaveButton.removeAttribute('disabled');
  }
  else {
    formSaveButton.classList.remove(saveButtonActive);
    formSaveButton.setAttribute('disabled', true);
  }

}

// метод навешивает слушателя с событием input на форму
const setEventListener = (formElement, {submitButtonSelector, inputSelector, ...rest}) => {
  const formSaveButton = formElement.querySelector(submitButtonSelector);
  const inputElementList = Array.from(formElement.querySelectorAll(inputSelector));
  formElement.addEventListener('input', (evt) => {
    if(evt.target.classList.value.includes('popup__input')) {
      checkInputInValid(evt.target) ? showError(formElement, evt.target, rest) : hideError(formElement, evt.target, rest);
      toggleButtonState(formSaveButton, inputElementList, rest);
    }
  });
}

// проверяем список input-ов на валидность
const checkFormElements = (formElement, {submitButtonSelector, inputSelector, ...rest}) => {
    const formSaveButton = formElement.querySelector(submitButtonSelector);
    const inputElementList = Array.from(formElement.querySelectorAll(inputSelector));
    if(inputElementList.length > 0) {
      inputElementList.forEach((inputElement) => {
        checkInputInValid(inputElement) ? showError(formElement, inputElement, rest) : hideError(formElement, inputElement, rest);
      });
      toggleButtonState(formSaveButton, inputElementList, rest);
    }
}

//метод настраивает валидацию форм
const enableValidation = ({formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      checkFormElements(formElement, rest);
      setEventListener(formElement, rest);
      
  });
}

const openPopupForm = (popup) => {
  const formElement = popup.querySelector(objFormParams.formSelector);
  checkFormElements(formElement, objFormParams);
}

enableValidation(objFormParams);

profileEdit.addEventListener('click', () => openPopupForm(popupTypeEdit));
popupAddButton.addEventListener('click', () => openPopupForm(popupTypeAdd));