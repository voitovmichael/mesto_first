import Popup from './Popup.js'
import {token} from '../utils/constants.js';
export default class PopupWithForm extends Popup{
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  // метод возвращает объект со значениями input-ов формы
  _getInpputValues() {
    const inputValuesObj = {};
    this._inputList.forEach((input) => inputValuesObj[input.name] = input.value);
    return inputValuesObj;
  }

  // метод обновляет/добавляет новые данные на сервере
  fetchNewData(fetchData, body) {
    fetch(fetchData.url, {
      method: fetchData.method,
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      debugger;
    });
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
}