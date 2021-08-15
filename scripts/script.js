//Main-page button
const editUserButton = document.querySelector(".profile__edit-button"); //Edit button
const addCardButton = document.querySelector(".profile__add-button"); //Profile button

//Edit profile const
const closePopupEdit = document.querySelector(".popup__close");
const userName = document.querySelector(".profile__title");
const userAbout = document.querySelector(".profile__subtitle");
const userFormName = document.getElementById("user-name");
const userFormAbout = document.getElementById("user-about");
const popupEditProfile = document.getElementById("popup-edit-profile");
const userEditForm = document.querySelector(".popup__container");

//Add cards const
const closePopupAddCard = document.getElementById("close-add-card-popup");
const addCardPopup = document.getElementById("popup-add-new-card");

//Create card const
const cardList = document.querySelector(".elements");
const cardTemplate = document.getElementById("card-template");
const userImageTitle = document.getElementById("image-title");
const userImage = document.getElementById("user-image");
const newImageForm = document.getElementById("add-card");

//Open image const
const popupImage = document.querySelector(".image-popup");
const closePopupImage = document.getElementById("close-image-popup");
const cardImage = document.querySelector(".image-popup__image");
const cardTitle = document.querySelector(".image-popup__title");

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

//Close popup when click ESC button
function escClosePopup(evt) {
    if (evt.keyCode === 27) {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

// Function close popup when click on overlay
function overlayClickClosePopup(popupType, evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popupType);
    }
}

//Open Popup
function openPopup(popupType) {
    popupType.classList.add("popup_opened");
    document.addEventListener("keydown", escClosePopup);
    //document.addEventListener("click", overlayClickClosePopup);
}

//Close Popup
function closePopup(popupType) {
    popupType.classList.remove("popup_opened");
    document.removeEventListener("keydown", escClosePopup);
    //document.removeEventListener("click", overlayClickClosePopup);
}

//Function Add cards
function addCard(newCard) {
    const cardElement = createCard(newCard);
    cardList.prepend(cardElement);
}

//Function Add User card
function addUserCard(evt) {
    evt.preventDefault();
    const userCard = {
        name: userImageTitle.value,
        link: userImage.value,
    };
    addCard(userCard);
    newImageForm.reset();
}

//Open image popup
function openPopupImage(link, name) {
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    openPopup(popupImage);
}

//Function open Edit popup
function openPopupFillForm() {
    userFormName.value = userName.textContent;
    userFormAbout.value = userAbout.textContent;
    openPopup(popupEditProfile);
    const buttonSave = popupEditProfile.querySelector(".popup__submit");
}

//Function Save on Edit Popup
function popupEditInfo(evt) {
    evt.preventDefault();
    userName.textContent = userFormName.value;
    userAbout.textContent = userFormAbout.value;
    closePopup(popupEditProfile);
}

//Function Add User card
function addUserCard(evt) {
    evt.preventDefault();
    const userCard = {
        name: userImageTitle.value,
        link: userImage.value,
    };
    addCard(userCard);
    newImageForm.reset();
}

//Open image popup
function openPopupImage(link, name) {
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    openPopup(popupImage);
}

//Add, delete, like card
function createCard(card) {
    const newCard = cardTemplate.content.querySelector(".elements__element").cloneNode(true);
    const deleteCardBurron = newCard.querySelector(".elements__delete");
    const likeButton = newCard.querySelector(".elements__like-button");
    const image = newCard.querySelector(".elements__image");
    newCard.querySelector(".elements__footer-title").textContent = card.name;
    image.src = card.link;
    image.alt = card.name;

//Open Image popup
image.addEventListener("click", () => openPopupImage(card.link, card.name));

//Click delete card
deleteCardBurron.addEventListener("click", (evt)  => evt.target.closest(".elements__element").remove());

//Click Like
likeButton.addEventListener("click", (evt) => evt.target.classList.toggle("elements__like-button_active"));
    return newCard;
}

//Open add card popup
addCardButton.addEventListener("click", () => openPopup(addCardPopup));
//Open Edit popup
editUserButton.addEventListener("click", () => openPopupFillForm());

//Click Save on popup
userEditForm.addEventListener("submit", popupEditInfo);
newImageForm.addEventListener("submit", (evt) => (addUserCard(evt), closePopup(addCardPopup)));

//Close popup when click on Close icon
closePopupEdit.addEventListener("click", () => closePopup(popupEditProfile));
closePopupAddCard.addEventListener("click", () => closePopup(addCardPopup)); 
closePopupImage.addEventListener("click", () => closePopup(popupImage));

//Close popup when click on overlay
popupEditProfile.addEventListener("click", (evt) => overlayClickClosePopup(popupEditProfile, evt));
addCardPopup.addEventListener("click", (evt) => overlayClickClosePopup(addCardPopup, evt));
popupImage.addEventListener("click", (evt) => overlayClickClosePopup(popupImage, evt));

//Add cards from massive
initialCards.forEach((card) => addCard(card));

//Form validation
enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); 