import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.form');
  }
  
  setSubmit(action) {
    this._handleSubmit = action;
  }

  setEventListener() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();

    });
    super.setEventListener();
  }

}