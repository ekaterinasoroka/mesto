export class Card {
  constructor(data, templateElement, openClickBigPhoto) {
    this._link = data.link;
    this._name = data.name;
    this._templateElement = templateElement;
    this.openClickBigPhoto = openClickBigPhoto;
  }

  _deleteCardElement() {
    this._element.remove();
  }

  _clickOnLike() {
    
    this._element.querySelector('.element__like').classList.toggle('element__like_is-active');
  }

  _getCard() {
    const cardElement = document
    .querySelector(this._templateElement)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }

  openBigPhoto = () => {
    this.openClickBigPhoto({name: this._name, link: this._link});
  }

  generateCard() {
    this._element = this._getCard();

    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCardElement();
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._clickOnLike();
    });
    this._element.querySelector('.element__img').addEventListener('click', this.openBigPhoto);

    return this._element;
  }



}