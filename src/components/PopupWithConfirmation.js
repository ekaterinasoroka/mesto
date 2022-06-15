import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.form');
  }

  setEventListener() {
    super.setEventListener();
  }

}