import "./index.css";

import Card from "../components/Card.js";
import {config} from "../utils/constants";
import FormValidator from "../components/FormValidator.js"; 
import Section from '../components/Section';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {buttonOpenProfileEdit, formСhangeInfo, nameInput, jobInput, buttonOpenFormAddCard, formAddCard, buttonUpdateAvatar, formInfoAvatar} from "../utils/constants.js";
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
  handleLikeClick,
  {handleRemoveButtonClick: (card) => {
    formDeleteCard.open();
    formDeleteCard.setSubmit(() => {
      api.deleteCard(card)
        .then(() => {
          card.deleteCardElement();
          formDeleteCard.close();
        })
        .catch((err) => {
          console.log(err)
        })
    });
  }});
  return card.generateCard();
 
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

const formAvatar = new PopupWithForm(
  '.popup_avatar',
  {
    handleSubmitForm: (item) => {
      formAvatar.renderLoading(true, 'form__save_disloading', 'form__save_loading')
      api.updateAvatarUser(item)
      .then((res) => {
        userInfo.setUserInfo(res)
        formAvatar.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        formAvatar.renderLoading(false, 'form__save_disloading', 'form__save_loading')
      })
    }
  }
)
formAvatar.setEventListener();

const formAdd = new PopupWithForm(
  '.popup_add',
  {
    handleSubmitForm: (item) => {
      formAdd.renderLoading(true, 'form__save_disloading', 'form__save_loading')
      api.addNewCard(item)
      .then((res) => {
        const cardElement = createNewCard(res);
        cardList.addItem(cardElement);
        formAdd.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        formAdd.renderLoading(false, 'form__save_disloading', 'form__save_loading')
      })

    }
  }
);
formAdd.setEventListener();

const formDeleteCard = new PopupWithConfirmation(
  '.popup_delete-card', 
);
formDeleteCard.setEventListener();

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
      formPopupEditForm.renderLoading(true, 'form__save_disloading', 'form__save_loading')
      api.patchEditProfile(item)
      .then((res) => {
        userInfo.setUserInfo(res)
        formPopupEditForm.close();
      })
      .catch((res) => {
        console.log(res)
      })
      .finally(() => {
        formPopupEditForm.renderLoading(false, 'form__save_disloading', 'form__save_loading')
      })

      
    }
  });
  formPopupEditForm.setEventListener();

const openPopupProfileForm = () => {
  const item = userInfo.getUserInfo();
  nameInput.value = item.name;
  jobInput.value = item.about;
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

  buttonUpdateAvatar.addEventListener("click", () => {
    formAvatar.open();
    formAvatarValidation.removeError();
    formAvatarValidation.disableSubmitButton();
  });


const formInfoValidation = new FormValidator(config, formСhangeInfo);
const formAddValidation = new FormValidator(config, formAddCard);
const formAvatarValidation = new FormValidator(config, formInfoAvatar);
formInfoValidation.enableValidation();
formAddValidation.enableValidation();
formAvatarValidation.enableValidation();

