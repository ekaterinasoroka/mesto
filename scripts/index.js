const buttonOpenProfileEdit = document.querySelector('.profile__edit-button');
const modalWindowProfile = document.querySelector('.popup_edit-button');
const buttonCloseModalProfileEdit = document.querySelector('.popup__close_edit');
const formСhangeInfo = document.querySelector('.form_popup_edit');
const nameInput = document.querySelector('#form__input_name');
const jobInput = document.querySelector('#form__input_profession');
const nameForm = document.querySelector('.profile__title');
const jobForm = document.querySelector('.profile__subtitle');
const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template__elements');
const formAddCard = document.querySelector('.form_popup_add');
const popupAddCard = document.querySelector('.popup_add-button');
const buttonCloseModalAddCard = document.querySelector('.popup__close_add');
const buttonSaveAdd = document.querySelector('.form__save_add');
const modalWindowFullSize = document.querySelector('.popup_full-size');
const modalCloseFullSize = document.querySelector('.popup__close_full-size');
const nameInputElement = document.querySelector('#form__input_cardname');
const linkInputElement = document.querySelector('#form__input_link');

function openPopup(popup) {
  popup.classList.add('popup_is-active');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-active');
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const newCardElement = getCard(
    { name: nameInputElement.value, link: linkInputElement.value });
  cardsContainer.prepend(newCardElement);
  closePopup(popupAddCard);
  nameInputElement.value = "";
  linkInputElement.value = "";
}

function openPopupProfileForm() {
  nameInput.value = nameForm.textContent;
  jobInput.value = jobForm.textContent;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  nameForm.textContent = nameInput.value;
  jobForm.textContent = jobInput.value;
  closePopup(modalWindowProfile);
}

function render() {
  const card = initialCards.map(getCard);
  cardsContainer.append(...card);
}

function getCard(item) {
  const getElementsTemplate = templateElement.content.cloneNode(true);
  const elementName = getElementsTemplate.querySelector('.element__name');
  const elementImg = getElementsTemplate.querySelector('.element__img');
  const elementDelete = getElementsTemplate.querySelector('.element__delete');
  const elementLike = getElementsTemplate.querySelector('.element__like');
  elementName.textContent = item.name;
  elementImg.src = item.link;
  elementImg.alt = item.name;

  function clickOnLike() {
    elementLike.classList.toggle('element__like_is-active');
  }

  function openBigImage(evt) {
    const bigImage = document.querySelector('.popup__big-img');
    const popupSubtitle = document.querySelector('.popup__subtitle');
    popupSubtitle.textContent = item.name;
    bigImage.src = item.link;
    bigImage.alt = item.name;
    openPopup(modalWindowFullSize);
  }

  elementLike.addEventListener('click', clickOnLike);
  elementDelete.addEventListener('click', deleteCardElement);
  elementImg.addEventListener('click', openBigImage);

  return getElementsTemplate;
}

render();

function deleteCardElement(evt) {
  const removeElements = evt.target.closest('.element');
  removeElements.remove();
}



buttonOpenProfileEdit.addEventListener('click', openPopupProfileForm);
buttonOpenProfileEdit.addEventListener('click', function () {
  openPopup(modalWindowProfile);
});
buttonCloseModalProfileEdit.addEventListener('click', function () {
  closePopup(modalWindowProfile);
});
formСhangeInfo.addEventListener('submit', handleProfileFormSubmit);
buttonOpenFormAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});
buttonCloseModalAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});
formAddCard.addEventListener('submit', handleAddCardFormSubmit);
modalCloseFullSize.addEventListener('click', function () {
  closePopup(modalWindowFullSize);
});

/*function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModalWindow();
  }
}
modalWindow.addEventListener('click', onOverlayClick);*/