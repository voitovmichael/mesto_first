import Popup from './Popup.js'
export default class PopupWithForm extends Popup{
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__container');
    this._inputPurposeName = document.querySelector('.popup__input_purpose_name');
    this._inputPurposeDescription = document.querySelector('.popup__input_purpose_description');
  }

  // метод возвращает объект со значениями input-ов формы
  _getInpputValues() {
    const inputValuesObj = {};
    inputValuesObj[this._inputPurposeName.name] = this._inputPurposeName.value;
    inputValuesObj[this._inputPurposeDescription.name] = this._inputPurposeDescription.value;
    return inputValuesObj;
  }

  // метод задает значения input для отображения формы
  setInputValues({name, description}) {
    debugger;
    this._inputPurposeName.value = name;
    this._inputPurposeDescription.value = description; 
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
}