export const initialCards = [
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

export const popupConfig = {
    popupOpened: 'popup_opened',
    popupClose: '.popup__close'
}

export const popupWithImageConfig = {
    popupImageSelector: '#image-popup',
    imagePopup: '.image-popup__image',
    imageTitle: '.image-popup__title'
}

export const cardConfig = {
    cardTemplate: '#card-template',
    cardList: '.elements',
    cardListItem: '.elements__element',
    cardTitle: '.elements__footer-title',
    image: '.elements__image',
    cardRemoveButton: '.elements__delete',
    cardLikeButton: '.elements__like-button',
    cardLikeButtonActive: 'elements__like-button_active'
};

export const newCardPopupConfig = {
    addCardPopup: '#popup-add-new-card',
    newCardForm: document.querySelector('.popup__new-card'),
   // newCardImage: document.querySelector('.popup__input_img')
}

export const formConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const profilePopupConfig = {
    profilePopupSelector: '#popup-edit-profile',
    profileForm: document.querySelector('.popup__container[name = edit-profile]'),
    userNameInput: document.querySelector('.popup__input_user_name'),
    userAboutInput: document.querySelector('.popup__input_user_about'),
}

export const profileConfig = {
    userName: '.profile__title',
    userAbout: '.profile__subtitle',
}

export const editUserButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');