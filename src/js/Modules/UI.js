class UI {
  constructor(user) {
    this._user = user;
    this._Init();
  }

  _Init() {
    this._loginBtn = document.getElementById('login-btn');
    this._accountPlace = document.getElementById('account-place');
  }

  AccounLoggedIn(user) {
    this._loginBtn.style.display = 'none';
    this._accountPlace.style.display = 'block';
    this._accountPlace.innerHTML = `<a href="#" class="account-btn" id="account-btn">${user.email}</a>`;
  }

  AccounLoggedOut() {
    this._loginBtn.style.display = 'block';
    this._accountPlace.style.display = 'none';
  }
}

export default UI;
