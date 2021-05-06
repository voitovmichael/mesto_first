// import {token} from '../utils/constants';
export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._description = document.querySelector(selectors.description);
    this._avatar = document.querySelector(selectors.avatar)
  }

  // fetchUserInfo() {
  //   return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', {
  //     headers: {
  //       authorization: token
  //     }
  //   })
  // }

  // метод возвращает объект с содержимым имени и описания
  getUserInfo() {
    return {name: this._name.textContent, description: this._description.textContent};
  }

  //метод устонавливает имя пользователя и его описание
  setUserInfo({name, about, avatar, ...rest}) {
    this._name.textContent = name;
    this._description.textContent = about;
    if(avatar) {
      this._avatar.style.backgroundImage = `url(${avatar})`;
    }
    if(rest._id) {
      this._id = rest._id;
    }
  }
  // метод возвращает id пользователя
  getUserId() {
    return this._id;
  }
}