import Popup from './Popup.js'
export default class PopupWithForm extends Popup{
  constructor(selector, submitCallback, ESC_CODE) {
    super(selector, ESC_CODE);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonConfirm = this._popup.querySelector('.popup__confirm');
    this._buttonConfirmText = this._buttonConfirm.textContent;
  }

  // метод возвращает объект со значениями input-ов формы
  _getInpputValues() {
    const inputValuesObj = {};
    this._inputList.forEach((input) => inputValuesObj[input.name] = input.value);
    return inputValuesObj;
  }

  // метод задает значения input для отображения формы
  setInputValues(data) {
    this._inputList.forEach((input) => {
      if(data.hasOwnProperty(input.name)) {
        input.value = data[input.name];
      }
    })
  }

  //метод возвращает форму
  getPopupForm() {
    return this._form;
  }

  // метод устанавливает обработчик на отпрвку формы
  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._submitCallback(this._getInpputValues());
    });
    super.setEventListeners();
  }

  // метод закрывает popup
  close() {
    this._form.reset();
    super.close();
  }

  //метод для отображения процесса запроса на сервер
  changeButtonName(isRequest) {
    this._buttonConfirm.textContent = isRequest ? 'Сохранение...' : this._buttonConfirmText;
  }

}