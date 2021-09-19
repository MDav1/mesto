export default class FormValidator {

  constructor(element, config) {
    this._formElement = element;
    this._selectorConfig = config;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._selectorConfig.submitButtonSelector);  
  }
   
  _hideInputError = (inputElement) => { 
    inputElement.classList.remove(this._selectorConfig.inputErrorClass); 
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    errorElement.classList.remove(this._selectorConfig.inputErrorClass);
    errorElement.classList.remove(this._selectorConfig.errorClass); 
  } 
   
  _showInputError = (inputElement, validationMessage) => { 
    inputElement.classList.add(this._selectorConfig.inputErrorClass); 
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    errorElement.textContent = validationMessage; 
    errorElement.classList.add(this._selectorConfig.errorClass); 
  } 
   
  _checkInputValidity = (inputElement) => { 
    inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement, inputElement.validationMessage); 
  }
   
  _hasInputValid = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid); 


  toggleButtonState = () => { 
    if (this._hasInputValid(this._inputList)) { 
      this.disableSubmitButton(); 
    } else { 
      this._buttonElement.disabled = false; 
      this._buttonElement.classList.remove(this._selectorConfig.inactiveButtonClass); 
    } 
  } 
   
  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => { 
      inputElement.addEventListener("input", (e) => { 
        e.preventDefault();
        this._checkInputValidity(inputElement); 
        this.toggleButtonState(); 
      }); 
    });
  }

  enableValidation = () => {
    this._setEventListeners(this._formElement);
  }

  disableSubmitButton = () => {
    this._buttonElement.disabled = true; 
    this._buttonElement.classList.add(this._selectorConfig.inactiveButtonClass);
  }

  resetValidation() {
    this._inputList.forEach(this._hideInputError.bind(this));
    this.disableSubmitButton();
    this._formElement.reset();
}
}