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
    .then(this._resolve)
    .catch(this._reject);
  }

  patch(url, body) {
    return fetch(`${this._url}/${url}`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(this._resolve)
    .catch(this._reject);
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
    .then(this._resolve)
    .catch(this._reject);
  }

  delete(url, id) {
    return fetch(`${this._url}/${url}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    })
    .then(this._resolve)
    .catch(this._reject);
  }

  put(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: token
      }
    })
    .then(this._resolve)
    .catch(this._reject)
  }

  _resolve(response) {
    if(response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`)
  }

  _reject(err) {
    console.log(err);
  }
}