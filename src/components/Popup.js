import {popupConfig} from '../utils/constants.js';

export default class Popup {

    constructor(popupSelector) {
        const {popupOpened, popupClose} = popupConfig;
        this._popup = document.querySelector(popupSelector);
        this._openedClass = popupOpened;
        this._closeButton = this._popup.querySelector(popupClose);
        this._closePopupEscClick = this._closePopupEscClick.bind(this);
    }

    _closePopupEscClick(e) {
    const escButton = 27;
    if (e.keyCode === escButton) {
        this.close();
        }
    }

    _handleOverlayClose(e) {
        if (e.target === e.currentTarget) {
            this.close();
        }
    }

    open () {
        document.addEventListener("keydown", this._closePopupEscClick);
        this._popup.classList.add(this._openedClass);  
    }

    close () {
        document.removeEventListener("keydown", this._closePopupEscClick);
        this._popup.classList.remove(this._openedClass);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', (e) => this._handleOverlayClose(e));
    }

    
}