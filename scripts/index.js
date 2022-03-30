const formEditProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popap');
const modalClose = document.querySelector('.form__close');



function openModalWindow() {
	modalWindow.classList.add('popap_is-active');
}
formEditProfile.addEventListener('click', openModalWindow);

function closeModalWindow() {
	modalWindow.classList.remove('popap_is-active');
}
modalClose.addEventListener('click', closeModalWindow);

function onOverlayClick(event) {
	if (event.target === event.currentTarget) {
		closeModalWindow();
	}
}

modalWindow.addEventListener('click', onOverlayClick);

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__profession');
let submitForm = document.querySelector('.profile');
let nameForm = document.querySelector('.profile__title');
let jobForm = document.querySelector('.profile__subtitle');
function formSubmitHandler (event) {
	event.preventDefault();
	nameInput.value = nameForm.textContent;
	jobInput.value = jobForm.textContent;
}

formElement.addEventListener('submit', formSubmitHandler); 
















