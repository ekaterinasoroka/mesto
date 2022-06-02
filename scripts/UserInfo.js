export default class UserInfo {
  constructor({infoName, infoProfession}) {
    this._name = document.querySelector(infoName);
    this._job = document.querySelector(infoProfession);
  }

  getUserInfo() {
    const item = {
    name: this._name.textContent,
    job: this._job.textContent
    }
    return item;
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._job.textContent = item.job;
  }
}