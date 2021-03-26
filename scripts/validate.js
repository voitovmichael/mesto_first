
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
const checkInputInValid = (formElement, inputElement, rest) => {
  !inputElement.validity.valid ? showError(formElement, inputElement, rest) : hideError(formElement, inputElement, rest);
}

// метод управляет активностью кнопки формы в зависимости от заполненности её input-ов
const toggleButtonState = (formSaveButton, inputList, {saveButtonActive}) => {
  const isInputvalid = !inputList.some((inputElement) => {
    return !inputElement.validity.valid;
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
  if(formSaveButton)
    toggleButtonState(formSaveButton, inputElementList, rest);
  inputElementList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputInValid(formElement, inputElement, rest);
      toggleButtonState(formSaveButton, inputElementList, rest);
    });
  })
}

//метод настраивает валидацию форм
const enableValidation = ({formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

      setEventListener(formElement, rest);  
  });
}

enableValidation(objFormParams);
