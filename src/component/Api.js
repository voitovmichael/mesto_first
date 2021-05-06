import {token} from '../utils/constants.js';
export default class Api {
  constructor(options) {
    this._url = options.url;
  }

  get(url) {
    return fetch(`${this._url}/${url}`, {
      headers: {
        authorization: token
      }
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  patch(body) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then((response) => {
      if(response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  post(body) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then((response) => {
      if(response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  delete(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((err) => {
      console.log(err)
    })
  }
}