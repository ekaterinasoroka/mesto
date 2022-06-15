export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
    // this._cardId = cardId;
  }

  getInfoUsers() {
    return fetch(`${this._url}`, {
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
      })  
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
      })  
  }

  patchEditProfile(nameInfo, aboutInfo) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({name: nameInfo, about: aboutInfo})
    })
    .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
    })
  }

  addNewCard(nameCard, linkCard) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({name: nameCard, link: linkCard})
    })
    .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
    })
  }

  deleteCard() {
    return fetch(`${this._url}/cards/${this._cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
    })
  }

  putLike() {
    return fetch(`${this._url}/cards/${this._cardId}`/likes, {
      headers: this._headers,
      method: 'PUT'
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
      })  
  }

  updateAvatarUser(linkAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({avatar: linkAvatar})
    })
    .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
    })
  }

}


