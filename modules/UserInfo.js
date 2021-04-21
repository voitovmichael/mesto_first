export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._description = document.querySelector(selectors.description);
  }

  // метод возвращает объект с содержимым имени и описания
  getUserInfo() {
    return {name: this._name.textContent, description: this._description.textContent};
  }

  //метод устонавливает имя пользователя и его описание
  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}