import Card from './Card.js'
import FormValidator from './FormValidator.js'

//Main-page button
const editUserButton = document.querySelector(".profile__edit-button"); //Edit button
const addCardButton = document.querySelector("#profile__add-button"); //Profile button

//Edit profile const
const userName = document.querySelector(".profile__title");
const userAbout = document.querySelector(".profile__subtitle");
const userFormName = document.querySelector(".popup__input_user_name");
const userFormAbout = document.querySelector(".popup__input_user_about");
const popupEditProfile = document.querySelector(".popup__edit_profile");

//Add cards const
const addCardPopup = document.querySelector("#popup-add-new-card");

//Create card const
const cardList = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template");
const addCardForm = document.querySelector('.popup__new_card');
const userImageTitle = document.querySelector(".popup__input_img_title");
const userImage = document.querySelector(".popup__input_img"); 

//Open image const
const popupImage = document.querySelector("#image-popup");
const popupCardImage = document.querySelector(".image-popup__image");
const popupCardTitle = document.querySelector(".image-popup__title");
const popups = document.querySelectorAll('.popup');

const forms = [
    {
         name: 'userEditForm',
         form: popupEditProfile
     },
     {
         name: 'addCardForm',
         form: addCardForm
     }
 ];

//Add Cards when open page
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const formValidators = {};

//Close popup when click ESC button
function closePopupEscClick(evt) {
    const escButton = 27;
    if (evt.keyCode === escButton) {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

//Open Popup
function openPopup(popupType) {
    popupType.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupEscClick);
}

//Close Popup
function closePopup(popupType) {
    popupType.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupEscClick);
}

//Close popup when click Close button or overlay
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close'))) {
            closePopup(popup);
        }
    })
});

//Open image popup
const openPopupImage = ((link, name) => {
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardTitle.textContent = popupCardImage.alt;
    openPopup(popupImage);
});  

//Construct Card
const addCard = (link, name) => {
    const card = new Card(link, name, cardTemplate, openPopupImage);
    return card.constructCard();
}

//Add user card
const addUserCard = ((evt) => {
    evt.preventDefault();
    cardList.prepend(addCard(userImage.value, userImageTitle.value));
    closePopup(addCardPopup);
    addCardForm.reset();
});

//Function open Edit popup
function openPopupFillForm() {
    formValidators["userEditForm"].disableSubmitButton();
    userFormName.value = userName.textContent;
    userFormAbout.value = userAbout.textContent;
    openPopup(popupEditProfile);
}

//Function Save on Edit Popup
function popupEditInfo(evt) {
    evt.preventDefault();
    userName.textContent = userFormName.value;
    userAbout.textContent = userFormAbout.value;
    closePopup(popupEditProfile);
}

//Open add card popup
addCardButton.addEventListener("click", () => {
    formValidators["addCardForm"].toggleButtonState();
    openPopup(addCardPopup)

});

//Open Edit popup
editUserButton.addEventListener("click", () => openPopupFillForm());

//Click Save on popup
popupEditProfile.addEventListener("submit", popupEditInfo);
addCardPopup.querySelector(".popup__container").addEventListener("submit", addUserCard);

//Add cards from massive
initialCards.forEach((item) => {
    cardList.append(addCard(item.link, item.name));
});

//Form validation
forms.forEach(item => {
    formValidators[item.name] = new FormValidator(item.form, {
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
        }); 
    formValidators[item.name].enableValidation();
});