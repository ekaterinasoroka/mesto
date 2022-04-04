const formEditProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('#form__input_name');
let jobInput = document.querySelector('#form__input_profession');
let nameForm = document.querySelector('.profile__title');
let jobForm = document.querySelector('.profile__subtitle');

function openModalWindow() {
	nameInput.value = nameForm.textContent;
	jobInput.value = jobForm.textContent;
	modalWindow.classList.add('popup_is-active');
}

function closeModalWindow() {
	modalWindow.classList.remove('popup_is-active');
}

/*function onOverlayClick(event) {
	if (event.target === event.currentTarget) {
		closeModalWindow();
	}
}
modalWindow.addEventListener('click', onOverlayClick);*/

function formSubmitHandler (event) {
	event.preventDefault();
	nameForm.textContent = nameInput.value;
	jobForm.textContent = jobInput.value;
	closeModalWindow();
}

formEditProfile.addEventListener('click', openModalWindow);
modalClose.addEventListener('click', closeModalWindow);
formElement.addEventListener('submit', formSubmitHandler); 
















