import Popup from './Popup.js';


export default class PopupWithForm extends Popup{
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.form');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.form__input');
    
    this._formValues = {};
    this._inputList.forEach(input => 
      this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  setEventListener() {
    super.setEventListener();
    this._popupForm.addEventListener('submit', (evt) => {  
      evt.preventDefault();  
      this._handleSubmitForm(this._getInputValues());
    });
    
  };

  close() {
    super.close();
    this._popupForm.reset();
  }

}