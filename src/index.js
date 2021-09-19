import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js'
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {
    initialCards,
    popupWithImageConfig,
    cardConfig,
    newCardPopupConfig,
    formConfig,
    profilePopupConfig,
    profileConfig,
    editUserButton,
    addCardButton
} from './utils/constants.js';

const formValidators = {};
const {popupImageSelector} = popupWithImageConfig;
const imagePopup = new PopupWithImage(popupImageSelector);

//Add cards from massive
const {cardTemplate, cardList} = cardConfig;
const list = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardTemplate, item => imagePopup.open(item));
        const cardElement = card.constructCard();
        list.addItem(cardElement);
    }
}, cardList);
list.render();

//Add user card
const {addCardPopup} = newCardPopupConfig;
const newCardPopup = new PopupWithForm(addCardPopup, (inputValues) => {
    const data = {
        name: inputValues['card-name'],
        link: inputValues['card-url']
    };
    const card = new Card(data, cardTemplate, item => imagePopup.open(item));

    list.addItem(card.constructCard());
    newCardPopup.close();
});

//Edit User Info
const {userName, userAbout} = profileConfig;
const userInfo = new UserInfo(userName, userAbout);

const {profilePopupSelector} = profilePopupConfig;
const profilePopup = new PopupWithForm(profilePopupSelector, (inputValues) => {
    const data = {
        name: inputValues['profile-name'],
        description: inputValues['profile-about']
    };
    userInfo.setUserInfo(data);
    profilePopup.close();
});

//Form validation
const formSelector = document.querySelectorAll(formConfig['formSelector']);
formSelector.forEach(item => {
    formValidators[item.name] = new FormValidator(item, formConfig); 
    formValidators[item.name].enableValidation();
});

//Open Edit User form
editUserButton.addEventListener('click', () => {
    const {name, about} = userInfo.getUserInfo();
    const {userNameInput, userAboutInput} = profilePopupConfig;

    userNameInput.setAttribute('value', name);
    userAboutInput.setAttribute('value', about);

    formValidators['edit-profile'].resetValidation();
    profilePopup.open();
});

//Open Add Card
addCardButton.addEventListener('click', () => {
    formValidators['add-card'].resetValidation();
    newCardPopup.open();
});

imagePopup.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();