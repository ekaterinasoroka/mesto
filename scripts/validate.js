function showInputError(inputErrorClass, errorClass, formElement, inputElement){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

function hideInputError(inputErrorClass, errorClass, formElement, inputElement){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

function removeError(config, popup) {
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
  const formElement = popup.querySelector(config.formSelector);
  inputList.forEach((inputElement) => {
    hideInputError(config.inputErrorClass, config.errorClass, formElement, inputElement);
  });
 };

function isValid(config, formElement, inputElement){
  if(!inputElement.validity.valid) {
    showInputError(config.inputErrorClass, config.errorClass, formElement, inputElement);
  } else {
    hideInputError(config.inputErrorClass, config.errorClass, formElement, inputElement);
  }
}

function setEventListener(config, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(formElement, config.inactiveButtonClass, submitButton, inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(config, formElement, inputElement);
      toggleButtonState(formElement, config.inactiveButtonClass, submitButton, inputList);
    });
    })
  };


function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(formElement, inactiveButtonClass, submitButton, inputList){
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled", true);
  }
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
   formElement.addEventListener('submit', (event) => {
     event.preventDefault();
   });
   setEventListener(config, formElement);
 });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});