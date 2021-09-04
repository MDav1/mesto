export default class Card {
    _link;
    _name;
    _newCard;
    _handleCardClick;

    constructor(link, name, cardTemplate, handleCardClick) {
        this._link = link;
        this._name = name;
        this._newCard = cardTemplate.content.querySelector(".elements__element").cloneNode(true);
        this._handleCardClick = handleCardClick;
    }

    _handleLike = () => {
        const likeButton = this._newCard.querySelector(".elements__like-button");
        likeButton.classList.toggle("elements__like-button_active");
    }

    _handleRemove = () => {
        this._newCard.remove();
    }

    constructCard = () => {
        const image = this._newCard.querySelector(".elements__image");
        const likeButton = this._newCard.querySelector(".elements__like-button");
        const deleteButton = this._newCard.querySelector(".elements__delete");

        this._newCard.querySelector(".elements__footer-title").textContent = this._name;

        image.src = this._link;
        image.alt = this._name;

        likeButton.addEventListener("click", this._handleLike);
        image.addEventListener("click", () => this._handleCardClick(this._link, this._name));
        deleteButton.addEventListener("click", this._handleRemove);

        return this._newCard;
    }
}