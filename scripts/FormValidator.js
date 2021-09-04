export default class FormValidator {
  _selectorConfig;
  _formElement;
  _inputList;
  _buttonElement;
  _inputErrorClass; 

  constructor(element, config) {
    this._formElement = element;
    this._selectorConfig = config;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._selectorConfig.submitButtonSelector);  
  }
   
  _hideInputError = (inputElement) => { 
    inputElement.classList.remove(this._inputErrorClass); 
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    errorElement.classList.remove(this._selectorConfig.errorClass); 
    errorElement.textContent = ""; 
  } 
   
  _showInputError = (inputElement, validationMessage) => { 
    inputElement.classList.add(this._inputErrorClass); 
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    errorElement.textContent = validationMessage; 
    errorElement.classList.add(this._selectorConfig.errorClass); 
  } 
   
  _checkInputValidity = (inputElement) => { 
    inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement, inputElement.validationMessage); 
  }
   
  _hasInputValid = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

  _toggleButtonState = () => { 
    if (this._hasInputValid(this._inputList)) { 
      this.disableSubmitButton(); 
    } else { 
      this._buttonElement.disabled = false; 
      this._buttonElement.classList.remove(this._selectorConfig.inactiveButtonClass); 
    } 
  } 
   
  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => { 
      inputElement.addEventListener("input", () => { 
        this._checkInputValidity(inputElement); 
        this._toggleButtonState(); 
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

}