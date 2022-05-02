const buttonOpenProfileEdit = document.querySelector('.profile__edit-button');
const modalWindowProfile = document.querySelector('.popup_edit-button');
const modalWindow = document.querySelector('.popup');
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

function closeButtonEsc (event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-active');
    closePopup(openPopup);
    }
};

function openPopup(popup) {
  popup.classList.add('popup_is-active');
  document.addEventListener('keydown', closeButtonEsc);
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_is-active')) {
      closePopup(popup);
    }
  });
  removeError(config, popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-active');
  document.removeEventListener('keydown', closeButtonEsc);
  popup.removeEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_is-active')) {
      closePopup(popup);
    }
  });
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const newCardElement = getCard(
    { name: nameInputElement.value, link: linkInputElement.value });
  cardsContainer.prepend(newCardElement);
  
  closePopup(popupAddCard);
  
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

function openBigImage(evt) {
  const bigImage = document.querySelector('.popup__big-img');
  const popupSubtitle = document.querySelector('.popup__subtitle');
  popupSubtitle.textContent = evt.target.alt;
  bigImage.src = evt.target.src;
  bigImage.alt = evt.target.alt;
  openPopup(modalWindowFullSize);
}


function clickOnLike(event) {
  event.target.classList.toggle('element__like_is-active');
}



buttonOpenProfileEdit.addEventListener('click', openPopupProfileForm);
buttonOpenProfileEdit.addEventListener('click', function () {
  
  openPopup(modalWindowProfile);
  
});
buttonCloseModalProfileEdit.addEventListener('click', function () {
  closePopup(modalWindowProfile);
});
formСhangeInfo.addEventListener('submit', handleProfileFormSubmit);

buttonOpenFormAddCard.addEventListener('click', ()=> {
  const submitButton = document.querySelector('.form__save');
  formAddCard.reset();
  openPopup(popupAddCard);
  disableSubmitButton(submitButton, config.inactiveButtonClass);
});

buttonCloseModalAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});
formAddCard.addEventListener('submit', handleAddCardFormSubmit);
modalCloseFullSize.addEventListener('click', function () {
  closePopup(modalWindowFullSize);
});