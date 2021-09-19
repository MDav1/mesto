import {cardConfig} from "../utils/constants.js";

export default class Card {

    constructor(data, cardTemplate, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._newCard = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        const {cardListItem} = cardConfig;
        return document.querySelector(this._newCard).content.querySelector(cardListItem).cloneNode(true);
    }

    _handleOnClick = () => {
        const card = {
            alt: this._name,
            title: this._name,
            link: this._link
        }
        this._handleCardClick(card);
    }

    _handleLike = () => {
        const {cardLikeButtonActive} = cardConfig;
        this._likeButton.classList.toggle(cardLikeButtonActive);
    }

    _handleRemove = () => {
        this._item.remove();
    }

    _setEventListeners = () => {
        const {cardRemoveButton, cardLikeButton} = cardConfig;
        this._item.querySelector(cardRemoveButton).addEventListener('click', this._handleRemove);
        this._likeButton = this._item.querySelector(cardLikeButton);
        this._likeButton.addEventListener('click', this._handleLike);
        this._image.addEventListener('click', this._handleOnClick);
    }

    constructCard = () => {
        const {image, cardTitle} = cardConfig;
        this._item = this._getTemplate();
        this._image = this._item.querySelector(image);
        this._image.alt = this._name;
        this._image.src = this._link;
        this._item.querySelector(cardTitle).textContent = this._name;

        this._setEventListeners();

        return this._item;
    }
}