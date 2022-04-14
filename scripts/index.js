const formEditProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalWindowProfile = document.querySelector('.popup__edit-button');
const modalClose = document.querySelector('.popup__close_edit');
const formСhangeInfo = document.querySelector('.form_popup_edit');
const nameInput = document.querySelector('#form__input_name');
const jobInput = document.querySelector('#form__input_profession');
const nameForm = document.querySelector('.profile__title');
const jobForm = document.querySelector('.profile__subtitle');
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

const formAddButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const templateElements = document.querySelector('.template__elements');
const formAddCards = document.querySelector('.form_popup_add');
const modalWindowElements = document.querySelector('.popup__add-button');
const modalCloseElements = document.querySelector('.popup__close_add');
const buttonSaveAdd = document.querySelector('.form__save_add');
const modalWindowFullSize = document.querySelector('.popup__full-size');
const modalCloseFullSize = document.querySelector('.popup__close_full-size');

function ModalWindowForm(modalWindow) {
  modalWindow.classList.toggle('popup_is-active');
}

function handlerAddButton(event) {
  event.preventDefault();
  const nameInputElements = document.querySelector('#form__input_cardname').value;
  const linkInputElements = document.querySelector('#form__input_link').value;
  const newCardElement = getElements(
    { name: nameInputElements, link: linkInputElements });
  elements.prepend(newCardElement);
  ModalWindowForm(modalWindowElements);
}

function hanlerOpenFormProfile(event) {
  event.preventDefault();
  nameInput.value = nameForm.textContent;
  jobInput.value = jobForm.textContent;
}

function formSubmitHandler(event) {
  event.preventDefault();
  nameForm.textContent = nameInput.value;
  jobForm.textContent = jobInput.value;
  ModalWindowForm(modalWindowProfile);
}

function render() {
  const html = initialCards.map(getElements);
  elements.append(...html);
}

function getElements(item) {
  const getElementsTemplate = templateElements.content.cloneNode(true);
  const element = getElementsTemplate.querySelector('.element');
  const elementName = getElementsTemplate.querySelector('.element__name');
  const elementImg = getElementsTemplate.querySelector('.element__img');
  const elementDelete = getElementsTemplate.querySelector('.element__delete');
  const elementLike = getElementsTemplate.querySelector('.element__like');
  elementName.textContent = item.name;
  elementImg.src = item.link;

  function clickOnLike() {
    elementLike.classList.toggle('element__like_is-active');
  }

  function deleteButtonElements() {
    const removeElements = elementDelete.closest('.element');
    removeElements.remove();
  }

  function hanlerOpenBigImg() {
    const bigImage = document.querySelector('.popup__big-img');
    const popupSubtitle = document.querySelector('.popup__subtitle');
    popupSubtitle.textContent = elementName.textContent;
    bigImage.src = elementImg.src;
  }

  elementLike.addEventListener('click', clickOnLike);
  elementDelete.addEventListener('click', deleteButtonElements);
  elementImg.addEventListener('click', function () {
    ModalWindowForm(modalWindowFullSize);
  });
  elementImg.addEventListener('click', hanlerOpenBigImg);

  return getElementsTemplate;
}

render();

formEditProfile.addEventListener('click', hanlerOpenFormProfile);
formEditProfile.addEventListener('click', function () {
  ModalWindowForm(modalWindowProfile);
});
modalClose.addEventListener('click', function () {
  ModalWindowForm(modalWindowProfile);
});
formСhangeInfo.addEventListener('submit', formSubmitHandler);
formAddButton.addEventListener('click', function () {
  ModalWindowForm(modalWindowElements);
});
modalCloseElements.addEventListener('click', function () {
  ModalWindowForm(modalWindowElements);
});
formAddCards.addEventListener('submit', handlerAddButton);
modalCloseFullSize.addEventListener('click', function () {
  ModalWindowForm(modalWindowFullSize);
});

/*function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModalWindow();
  }
}
modalWindow.addEventListener('click', onOverlayClick);*/