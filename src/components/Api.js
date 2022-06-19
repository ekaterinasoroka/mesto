import { profileTitle, profileSubtitle, profileAvatar } from "../utils/constants";


export default class Api {
  constructor(url, cardId) {
    this._url = url;
    this._cardId = cardId;
  }

  getInfoUsers() {
    return fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
      }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
      })  
      .then((item) => {
        
        profileTitle.textContent = item.name,
        profileSubtitle.textContent = item.about,
        profileAvatar.src = item.avatar
      
      })
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
      }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
      })

  }

  patchEditProfile(item) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
      },
      body: JSON.stringify({name: item.name, about: item.about})
    })
    .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
    })
  }

  addNewCard(item) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
      },
      method: 'POST',
      body: JSON.stringify({name: item.cardname, link: item.link})
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
      headers: {
        authorization: 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
      },
      method: 'DELETE',
    })
    .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
    })
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
      },
      method: 'DELETE'
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка')
      })  
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
      },
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
      headers: {
        'Content-Type': 'application/json',
        authorization: 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
      },
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


