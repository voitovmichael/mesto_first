export default class FormValidator {
  constructor(objFormParams, form) {
    this._objFormParams = objFormParams;
    this._form = form;
  }

  //метод показывает предупреждение об ошибке в случае некорректного значения поля
_showError = (inputElement, {inputError, inputErrorActive}) => {
  inputElement.classList.add(inputError);
  const errorElemnt = this._form.querySelector(`.${inputElement.name}-placeholder`);
  errorElemnt.textContent = inputElement.validationMessage;
  errorElemnt.classList.add(inputErrorActive);
  
}

//метод скрывает предупреждение об ошибке
_hideError (inputElement, {inputError, inputErrorActive}) {
  inputElement.classList.remove(inputError);
  const errorElemnt = this._form.querySelector(`.${inputElement.name}-placeholder`);
  errorElemnt.classList.remove(inputErrorActive);
}

//метод проверяет поле формы на валидность
_checkInputInValid (inputElement, rest) {
  !inputElement.validity.valid ? this._showError(inputElement, rest) : this._hideError(inputElement, rest);
}

// метод управляет активностью кнопки формы в зависимости от заполненности её input-ов
_toggleButtonState (formSaveButton, inputList, {saveButtonActive}) {
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
_setEventListener ({submitButtonSelector, inputSelector, ...rest}) {
  const formSaveButton = this._form.querySelector(submitButtonSelector);
  const inputElementList = Array.from(this._form.querySelectorAll(inputSelector));
  if(formSaveButton)
    this._toggleButtonState(formSaveButton, inputElementList, rest);
  inputElementList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputInValid(inputElement, rest);
      this._toggleButtonState(formSaveButton, inputElementList, rest);
    });
  })
}

//метод настраивает валидацию форм
enableValidation () {
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListener(this._objFormParams);
}

}