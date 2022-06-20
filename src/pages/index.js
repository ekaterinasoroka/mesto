import "./index.css";

import Card from "../components/Card.js";
import {config} from "../utils/uniti.js";
import FormValidator from "../components/FormValidator.js"; 
import Section from '../components/Section';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {buttonOpenProfileEdit, formСhangeInfo, nameInput, jobInput, buttonOpenFormAddCard, formAddCard, initialCards, elementDelete} from "../utils/constants.js";
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation";

let ownerId = null; 

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43'); 

Promise.all([api.getInfoUsers(), api.getCards()])
  .then(([user, cards]) => {
    ownerId = user._id;
    userInfo.setUserInfo(user);
    cardList.renderItems(cards);
  })
  .catch(err => {console.log(err)});

const createNewCard = (item) => {
  const card = new Card(item, '.template__elements', ownerId, {
    openClickBigPhoto: () => {
      popupBigImage.open(item);
    }  
  },
  handleLikeClick);
  const cardElement = card.generateCard();
  if(card.isLiked()){
    card.clickOnLike()
  }
  
  return cardElement;
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api.deleteLike(card)
    .then((res) => {
      card.clickOnLike();
      card.updateLikes(res.likes);
    })
    .catch((err) => {
      console.log(err)
    })
     
  } else {
    api.putLike(card)
      .then((res) => {
        card.clickOnLike();
        card.updateLikes(res.likes);
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const cardList = new Section({
  renderer: (cardItem) => {
    const card = createNewCard(cardItem);
    cardList.addItem(card);
  }
},
'.elements'
);


const formAdd = new PopupWithForm(
  '.popup_add',
  {
    handleSubmitForm: (item) => {
      api.addNewCard(item)
      .then((res) => {
        const cardElement = createNewCard(res);
        cardList.addItem(cardElement);
        formAdd.close();
      })
      .catch((err) => {
        console.log(err)
      })

    }
  }
);
formAdd.setEventListener();

// const formDeleteCard = new PopupWithConfirmation(
//   '.popup_delete-card', 
// );
// formDeleteCard.setEventListener();

const popupBigImage = new PopupWithImage(
  '.popup_full-size',
  '.popup__big-img',
  '.popup__subtitle'
  
);
popupBigImage.setEventListener();

const userInfo = new UserInfo(
'.profile__title',
'.profile__subtitle',
'.profile__avatar'
);

const formPopupEditForm = new PopupWithForm (
  '.popup_edit',
  {
    handleSubmitForm: (item) => {
      api.patchEditProfile(item)
      .then((res) => {
        userInfo.setUserInfo(res)
        formPopupEditForm.close();
      })
      .catch((res) => {
        console.log(res)
      })

      
    }
  });
  formPopupEditForm.setEventListener();

const openPopupProfileForm = () => {
  const item = userInfo.getUserInfo();
  nameInput.value = item.name;
  jobInput.value = item.job;
}
  
  buttonOpenProfileEdit.addEventListener('click', ()=> {
    formPopupEditForm.open();
    openPopupProfileForm();
    formInfoValidation.removeError();
    formInfoValidation.disableSubmitButton();
  });

  buttonOpenFormAddCard.addEventListener('click', ()=> {
    formAdd.open();
    formAddValidation.removeError();
    formAddValidation.disableSubmitButton();
  });


const formInfoValidation = new FormValidator(config, formСhangeInfo);
const formAddValidation = new FormValidator(config, formAddCard);
formInfoValidation.enableValidation();
formAddValidation.enableValidation();








 

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

// function openBigImage(item) {
//   popupSubtitle.textContent = item.name;
//   bigImage.src = item.link;
//   bigImage.alt = item.name;
//   openPopup(modalWindowFullSize);
// };






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
