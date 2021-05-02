import {token} from '../utils/constants.js';
export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector(this._selector);
  }

  //метод возвращает данные с сервера для создания карточек
  _fetchCardsInfo(fetchUrl, callback) {
    fetch(fetchUrl, {
      headers: {
        authorization: token
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((items) => {
      callback(items)
    })
  }

  renderItems(fetchUrl) {
    this._fetchCardsInfo(fetchUrl, (items) => {
      items.forEach((item) => {
        this._renderer(item);
      });
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }

}