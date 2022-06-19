export default class UserInfo {
  constructor(infoName, infoProfession) {
    this._name = document.querySelector(infoName);
    this._about = document.querySelector(infoProfession);
  }

  getUserInfo() {
    const item = {
      name: this._name.textContent,
      about: this._about.textContent,
    }
    return item;
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._about.textContent = item.about;
  }
}