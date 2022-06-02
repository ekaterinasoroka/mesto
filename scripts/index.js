import Card from "./Card.js";
import {config} from "../uniti.js";
import FormValidator from "./FormValidator.js"; 
import Section from './Section.js';
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const buttonOpenProfileEdit = document.querySelector('.profile__edit-button');
const modalWindowProfile = document.querySelector('.popup_edit');
const buttonCloseModalProfileEdit = document.querySelector('.popup__close_edit');
const formСhangeInfo = document.querySelector('.form_popup_edit');
const nameInput = document.querySelector('#form__input_name');
const jobInput = document.querySelector('#form__input_profession');
const nameFormProfile = document.querySelector('.profile__title');
const jobFormProfile = document.querySelector('.profile__subtitle');
const buttonOpenFormAddCard = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
const formAddCard = document.querySelector('.form_popup_add');
const popupAddCard = document.querySelector('.popup_add');
const buttonCloseModalAddCard = document.querySelector('.popup__close_add');
const buttonSaveAdd = document.querySelector('.form__save_add');
const modalWindowFullSize = document.querySelector('.popup_full-size');
const modalCloseFullSize = document.querySelector('.popup__close_full-size');
const bigImage = document.querySelector('.popup__big-img');
const name =  document.querySelector('#form__input_cardname');
const link =  document.querySelector('#form__input_link');
const popupSubtitle = document.querySelector('.popup__subtitle');

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

const formInfoValidation = new FormValidator(config, formСhangeInfo);
const formAddValidation = new FormValidator(config, formAddCard);
formInfoValidation.enableValidation();
formAddValidation.enableValidation();

const createNewCard = (item) => {
  const card = new Card(item, '.template__elements', openBigImage);
  return card.generateCard();
}

const formAdd = new PopupWithForm(
  '.popup_add',
  {
    handleSubmitForm: (item) => {
      const cardElement = createNewCard({name: item.cardname, link: item.link});
      cardList.addItem(cardElement);
      formAdd.close();
    }
  }
);


const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = createNewCard(cardItem);
    cardList.addItem(card);
  }
},
'.elements'
);
cardList.renderItems(initialCards);



const userInfo = new UserInfo({
  nameFormProfile,
  jobFormProfile
});

const formPopupEditForm = new PopupWithForm (
  '.popup_edit',
  {
    handleSubmitForm: (item) => {
      userInfo.setUserInfo(item);
    }
  });
 

  
  buttonOpenProfileEdit.addEventListener('click', ()=> {
    formPopupEditForm.open();
    const item = userInfo.getUserInfo();
      nameInput.value = item.name;
      jobInput.value = item.job;
      formInfoValidation.removeError();
      formInfoValidation.disableSubmitButton();
      formPopupEditForm.close();
  });

  buttonOpenFormAddCard.addEventListener('click', ()=> {
    formAdd.open();
    formAddValidation.removeError();
    formAddValidation.disableSubmitButton();
  });

  formPopupEditForm.setEventListener();
  formAdd.setEventListener();
 


// function closeButtonEsc(event) {
//   if (event.key === 'Escape') {
//     const openPopup = document.querySelector('.popup_is-active');
//     closePopup(openPopup);
//   }
// };

// function openPopup(popup) {
//   popup.classList.add('popup_is-active');
//   document.addEventListener('keydown', closeButtonEsc);
// };

// function closePopup(popup) {
//   popup.classList.remove('popup_is-active');
//   document.removeEventListener('keydown', closeButtonEsc);
// };

// function handleCloseOverlay(event, popup) { //функция закрытия при клике на затемненную часть
//   if (event.target.classList.contains('popup') || event.target.classList.contains('popup_is-active')){
//     closePopup(popup);
//   }
// };

// function openPopupProfileForm() {
//   nameInput.value = nameFormProfile.textContent;
//   jobInput.value = jobFormProfile.textContent;
// };

// function handleProfileFormSubmit(event) {
//   event.preventDefault();
//   nameFormProfile.textContent = nameInput.value;
//   jobFormProfile.textContent = jobInput.value;
//   closePopup(modalWindowProfile);
// };


// initialCards.map((item) => {
//   const card = createNewCard(item);
//   cardsContainer.prepend(card);
// }); 

// function handleAddCardFormSubmit(event) {
//   event.preventDefault();
//   const cardElement = createNewCard({name: name.value, link: link.value});
//   cardsContainer.prepend(cardElement);
//   closePopup(popupAddCard);
// };

function openBigImage(item) {
  popupSubtitle.textContent = item.name;
  bigImage.src = item.link;
  bigImage.alt = item.name;
  openPopup(modalWindowFullSize);
};






// buttonCloseModalProfileEdit.addEventListener('click', function () {
//   closePopup(modalWindowProfile);
// });
// // formСhangeInfo.addEventListener('submit', handleProfileFormSubmit);

// buttonCloseModalAddCard.addEventListener('click', function () {
//   closePopup(popupAddCard);
// });
// formAddCard.addEventListener('submit', handleAddCardFormSubmit);
// modalCloseFullSize.addEventListener('click', function () {
//   closePopup(modalWindowFullSize);
// });
// modalWindowProfile.addEventListener('mousedown', (event) =>  {
//   handleCloseOverlay(event, modalWindowProfile);
// });
// popupAddCard.addEventListener('mousedown', (event) =>  {
//   handleCloseOverlay(event, popupAddCard);
// });
// modalWindowFullSize.addEventListener('click', (event) =>  {
//   handleCloseOverlay(event, modalWindowFullSize);
// });
// modalWindowProfile.removeEventListener('click', (event) =>  {
//   handleCloseOverlay(event, modalWindowProfile);
// });
// popupAddCard.removeEventListener('click', (event) =>  {
//   handleCloseOverlay(event, popupAddCard);
// });
// modalWindowFullSize.removeEventListener('click', (event) =>  {
//   handleCloseOverlay(event, modalWindowFullSize);
// });




// function clickOnLike(event) {
//   event.target.classList.toggle('element__like_is-active');
// };
// function render() {
//   const card = initialCards.map(getCard);
//   cardsContainer.append(...card);
// };

// function getCard(card) {
//   const getElementsTemplate = templateElement.content.cloneNode(true);
//   const elementName = getElementsTemplate.querySelector('.element__name');
//   const elementImg = getElementsTemplate.querySelector('.element__img');
//   const elementDelete = getElementsTemplate.querySelector('.element__delete');
//   const elementLike = getElementsTemplate.querySelector('.element__like');
//   elementName.textContent = card.name;
//   elementImg.src = card.link;
//   elementImg.alt = card.name;
//   elementLike.addEventListener('click', clickOnLike);
//   elementDelete.addEventListener('click', deleteCardElement);
//   
//   return getElementsTemplate;
// };

// render();

// function deleteCardElement(evt) {
//   const removeElements = evt.target.closest('.element');
//   removeElements.remove();
// };
