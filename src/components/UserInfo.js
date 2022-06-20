export default class UserInfo {
  constructor(infoName, infoProfession, infoAvatar) {
    this._name = document.querySelector(infoName);
    this._about = document.querySelector(infoProfession);
    this._avatar = document.querySelector(infoAvatar);
  }

  getUserInfo() {
    const item = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
    return item;
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._about.textContent = item.about;
    this._avatar.src = item.avatar;
  }
}