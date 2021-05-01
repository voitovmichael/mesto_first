export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector(this._selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

}