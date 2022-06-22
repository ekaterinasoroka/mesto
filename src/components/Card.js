export default class Card {
  constructor(data,  templateSelector, ownerId, {openClickBigPhoto}, handleLikeClick, {handleRemoveButtonClick})  {
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
    this._handleRemoveButtonClick = handleRemoveButtonClick;
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
    this._elementDelete = this._element.querySelector('.element__delete');


    this._elementImg.src = this._link;
    this._elementName.textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementLikes.textContent = this._likes.length; 
    this._cardOwner();
    this._elementDelete.addEventListener('click', () => {this._handleRemoveButtonClick(this)});
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this)
    });
    this._elementImg.addEventListener('click', () => this._openClickBigPhoto(this._data));

    return this._element;
  }
  deleteCardElement() {
    this._element.remove();
    this._element = null;
  }

  isLiked() { //проверяется есть ли наш лайк на карточке или нет
    return this._likes.some((data) => {
      return data._id.includes(this._ownerId)
    });

  }

  

  updateLikes(likes) { //метод для обновления количества лайков
    this._likes = likes;
    this._elementLikes.textContent = this._likes.length; 
  }


  clickOnLike() {
    this._buttonLike.classList.toggle('element__like_is-active');
  }


  _cardOwner() {
    if (this._id !== this._ownerId) {
      this._elementDelete.remove()
    }
  }


}