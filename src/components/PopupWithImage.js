import Popup from './Popup.js';
import {popupWithImageConfig} from "../utils/constants.js";

export default class PopupWithImage extends Popup {

    constructor (popupSelector) {
        super(popupSelector);
    }

    open(data) {
        const {imagePopup, imageTitle} = popupWithImageConfig;
        const image = this._popup.querySelector(imagePopup);

        image.src = data.link;
        image.alt = data.alt;

        this._popup.querySelector(imageTitle).textContent = data.title;

        super.open();
    }
}