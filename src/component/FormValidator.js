export default class FormValidator {
  constructor(objFormParams, form) {
    this._objFormParams = objFormParams;
    this._form = form;
    this._formSaveButton = this._form.querySelector(this._objFormParams.submitButtonSelector);
    this._inputElementList = Array.from(this._form.querySelectorAll(this._objFormParams.inputSelector));
  }

  //метод показывает предупреждение об ошибке в случае некорректного значения поля
_showError (inputElement){
  inputElement.classList.add(this._objFormParams.inputError);
  const errorElemnt = this._form.querySelector(`.${inputElement.name}-placeholder`);
  errorElemnt.textContent = inputElement.validationMessage;
  errorElemnt.classList.add(this._objFormParams.inputErrorActive);
  
}

//метод скрывает предупреждение об ошибке
_hideError (inputElement) {
  inputElement.classList.remove(this._objFormParams.inputError);
  const errorElemnt = this._form.querySelector(`.${inputElement.name}-placeholder`);
  errorElemnt.classList.remove(this._objFormParams.inputErrorActive);
}

//метод проверяет поле формы на валидность
_checkInputInValid (inputElement) {
  !inputElement.validity.valid ? this._showError(inputElement) : this._hideError(inputElement);
}

// метод управляет активностью кнопки формы в зависимости от заполненности её input-ов
toggleButtonState () {
  const isInputvalid = !this._inputElementList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  if(isInputvalid) {
    this._formSaveButton.classList.add(this._objFormParams.saveButtonActive);
    this._formSaveButton.removeAttribute('disabled');
  }
  else {
    this._formSaveButton.classList.remove(this._objFormParams.saveButtonActive);
    this._formSaveButton.setAttribute('disabled', true);
  }

}

// метод навешивает слушателя с событием input на форму
_setEventListener () {
  if(this._formSaveButton)
    this.toggleButtonState();
    this._inputElementList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputInValid(inputElement);
      this.toggleButtonState();
    });
  })
}

//метод настраивает валидацию форм
enableValidation () {
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListener();
}

}