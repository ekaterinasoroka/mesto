export default class Card {
  constructor(data,  templateSelector, ownerId, {openClickBigPhoto}, handleLikeClick)  {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._likes = data.likes;
    this._id = data.owner._id;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._openClickBigPhoto = openClickBigPhoto;
    this._handleLikeClick = handleLikeClick;
  }

  _deleteCardElement() {
    this._element.remove();
  }

  clickOnLike() {
    this._buttonLike.classList.toggle('element__like_is-active');
  }

  updateLikes(likes) { //метод для обновления количества лайков
    this._likes = likes;
    this._elementLikes.textContent = this._likes.length; 
  }

  isLiked() { //проверяется есть ли наш лайк на карточке или нет
    return this._likes.find((data) => {
      data._id == this._ownerId
    })
  }

  _getCard() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getCard();

    this._buttonLike = this._element.querySelector('.element__like');
    this._elementImg = this._element.querySelector('.element__img');
    this._elementName = this._element.querySelector('.element__name');
    this._elementLikes = this._element.querySelector('.element__like-number');

    this._elementImg.src = this._link;
    this._elementName.textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementLikes.textContent = this._likes.length; 

    this._element.querySelector('.element__delete').addEventListener('click', () => {this._deleteCardElement()});
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this)
    });
    this._elementImg.addEventListener('click', () => this._openClickBigPhoto(this._data));

    return this._element;
  }
}