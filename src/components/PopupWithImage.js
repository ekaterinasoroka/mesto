import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, srcSelector, subtitleSelector) {
    super(popupSelector);
    this._srcSelector = this._popupSelector.querySelector(srcSelector);
    this._subtitleSelector = this._popupSelector.querySelector(subtitleSelector);
  }

  open(data) {
    super.open();
    this._srcSelector.src = data.link;
    this._srcSelector.alt = data.name;
    this._subtitleSelector.textContent = data.name;
  }
}