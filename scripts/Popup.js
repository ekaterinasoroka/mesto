export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_is-active');
  }

  close() {
    this._popupSelector.classList.remove('popup_is-active');
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListener() {
    document.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    this._popupSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup_is-active')) {
        this.close();
      }
    });
    document.addEventListener("keydown", this._handleEscClose); 
  }
}