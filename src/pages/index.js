import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    initialCards,
    popupWithImageConfig,
    cardConfig,
    newCardPopupConfig,
    formConfig,
    profilePopupConfig,
    profileConfig
} from '../utils/constants.js';

const formValidators = {};
const {popupImageSelector} = popupWithImageConfig;
const imagePopup = new PopupWithImage(popupImageSelector);

const createCard = (data) => {
    const card = new Card (data, cardTemplate, item => imagePopup.open(item));
    return card.constructCard();
}

//Add cards from massive
const {cardTemplate, cardList} = cardConfig;
const list = new Section ({
    items: initialCards,
    renderer: (item) => {
        list.addItem(createCard(item));
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
    list.addItem(createCard(data));
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
const editUserButton = document.querySelector('.profile__edit-button');
editUserButton.addEventListener('click', () => {
    const {name, about} = userInfo.getUserInfo();
    const {userNameInput, userAboutInput} = profilePopupConfig;

    userNameInput.setAttribute('value', name);
    userAboutInput.setAttribute('value', about);

    formValidators['edit-profile'].resetValidation();
    profilePopup.open();
});

//Open Add Card
const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => {
    formValidators['add-card'].resetValidation();
    newCardPopup.open();
});

imagePopup.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();