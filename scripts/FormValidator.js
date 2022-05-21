export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  
  _showInputError(inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };
  
  removeError(popup) {
    const inputList = Array.from(popup.querySelectorAll(this._inputSelector));
    // const formElement = popup.querySelector(this._formSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
   };
  
  _isValid(inputElement){
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
    });
  };
  
  _toggleButtonState(inputList, submitButton){
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(submitButton);
    } else {
      this._enableSubmitButton(submitButton);
    }
  };
  
  disableSubmitButton(submitButton){
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.setAttribute("disabled", true);
  };
  
  _enableSubmitButton(submitButton){
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.removeAttribute("disabled", true);
  }

  _setEventListener() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, submitButton);
        this._isValid(inputElement);
      });
      })
    };
  
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
     this._formElement.addEventListener('submit', (event) => {
       event.preventDefault();
     });
     this._setEventListener(formElement);                    
   });
  }
  
  // enableValidation(config);
  
}