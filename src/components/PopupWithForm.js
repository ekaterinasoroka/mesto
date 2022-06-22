import Popup from '../components/Popup.js';


export default class PopupWithForm extends Popup{
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.form');
    this._buttonElement = this._popupForm.querySelector('.form__save');
    this._handleSubmitForm = handleSubmitForm;
  }

  renderLoading(isLoading, buttonDisactive, buttonLoading) {
    if(isLoading) { 
      this._buttonElement.classList.add(buttonLoading);
    }
    else{
      this._buttonElement.classList.remove(buttonLoading);
      this._buttonElement.classList.remove(buttonDisactive);
    }
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