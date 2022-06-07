export default class Card {
  constructor(data, templateSelector, {openClickBigPhoto}) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openClickBigPhoto = openClickBigPhoto;

  }

  _deleteCardElement() {
    this._element.remove();
  }

  _clickOnLike() {
    this._buttonLike.classList.toggle('element__like_is-active');
  }

  _getCard() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }

  // openBigPhoto = () => {
  //   this.openClickBigPhoto({name: this._name, link: this._link});
  // }

  generateCard() {
    this._element = this._getCard();

    this._buttonLike = this._element.querySelector('.element__like');
    this._elementImg = this._element.querySelector('.element__img');
    this._elementName = this._element.querySelector('.element__name');

    this._elementImg.src = this._link;
    this._elementName.textContent = this._name;
    this._elementImg.alt = this._name;

    this._element.querySelector('.element__delete').addEventListener('click', () => {this._deleteCardElement()});
    this._buttonLike.addEventListener('click', () => this._clickOnLike());
    this._elementImg.addEventListener('click', () => this._openClickBigPhoto(this._data));
    
    return this._element;
  }
}