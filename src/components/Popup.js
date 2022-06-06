export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_is-active');
    document.addEventListener("keydown", this._handleEscClose); 
  }

  close() {
    this._popupSelector.classList.remove('popup_is-active');
    document.removeEventListener("keydown", this._handleEscClose); 
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  setEventListener() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    this._popupSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup_is-active')) {
        this.close();
      }
    });
    
  }
}