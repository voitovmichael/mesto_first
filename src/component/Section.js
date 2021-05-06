import {token} from '../utils/constants.js';
export default class Section {
  constructor(renderer, selector, fetchCardsInfo) {
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector(this._selector);
    this._fetchCardsInfo = fetchCardsInfo;
    
  }

  renderItems() {
    this._fetchCardsInfo('cards')
    .then((data) => {
      data.forEach((item) => {this._renderer(item)});
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }

}