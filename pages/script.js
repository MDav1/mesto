//Edit profile
let closePopupEdit = document.querySelector(".popup__close");
let userName = document.querySelector(".profile__title");
let userAbout = document.querySelector(".profile__subtitle");
let userFormName = document.getElementById("user-name");
const userFormAbout = document.getElementById("user-about");
let editUserButton = document.querySelector(".profile__edit-button");
let popupEdit = document.querySelector(".popup-edit");
let userEditForm = document.querySelector(".popup__container");


//Open Popup
function openPopup(popupType) {
    popupType.classList.add("popup_opened");
}

//Close Popup
function closePopup(popupType) {
    popupType.classList.remove("popup_opened");
}

//Close Edit Popup when click on Close icon
closePopupEdit.addEventListener("click", function () {
    closePopup(popupEdit);
});

//Open Edit popup
function openPopupFillForm() {
    userFormName.setAttribute("value", userName.textContent);
    userFormAbout.setAttribute("value", userAbout.textContent);
    openPopup(popupEdit);
}

editUserButton.addEventListener("click", function () {
    openPopupFillForm();
});

//Click Save on Edit Popup
function popupEditInfo(evt) {
    evt.preventDefault();
    userName.textContent = userFormName.value;
    userAbout.textContent = userFormAbout.value;
    closePopup(popupEdit);
}
  
//Click Save on Edit popup
userEditForm.addEventListener("submit", popupEditInfo);