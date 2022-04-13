class Modal {
  constructor() {
    this._modal = document.getElementById('modal-window');
    this._open = false;
    this._current = 'none';
    this._loginTemplate = `		
		<div class="modal">
			<button class="close-modal">X</button>
			<div class="modal-content">
			<h3>Log In</h3>
			<form action="" class="login-form">
				<div class="mb-3">
					<input type="email" id="login-email-input" placeholder="E-Mail">
				</div>
				<div class="mb-3">
					<input type="password" id="login-password-input" placeholder="Password">
				</div>
				<p>Dosn't have account yet <a href="#" class="switch-login">Sign Up</a></p>
				<button class="login">Login</button>
			</form>
			</div>
		</div>
		`;
    this._signupTemplate = `
		<div class="modal">
			<button class="close-modal">X</button>
			<div class="modal-content">
				<h3>Sign up</h3>
				<form action="" class="login-form">
					<div class="mb-3">
						<input type="text" id="signup-name-input" placeholder="Name">
					</div>
					<div class="mb-3">
						<input type="email" id="signup-email-input" placeholder="E-Mail">
					</div>
					<div class="mb-3">
						<input type="password" id="signup-password-input" placeholder="Password">
					</div>
					<p>Already have an account <a href="#" class="switch-login">Logi In</a></p>
					<button class="signup">Signup</button>
				</form>
			</div>
		</div>
		`;
    this._rentingTemplate = `
		<div class="modal">
			<button class="close-modal">X</button>
			<div class="modal-content">
				<h1>Renting</h1>
				<form action="" class="renting-form" id="renting-form">
					<div class="mb-3 double-input">
						<input type="text" id="renting-name-input" placeholder="Name">
						<input type="text" id="renting-lastname-input" placeholder="Lastname">
					</div>
					<div class="mb-3">
						<input type="email" id="renting-email-input" placeholder="E-Mail">
					</div>
					<div class="mb-3">
						<input type="phone" id="renting-phone-input" placeholder="Phone Number">
					</div>
					<div class="mb-3">
						<input type="text" id="renting-address-input" placeholder="Address">
					</div>
					<div class="mb-3 double-input">
						<input type="date" id="renting-startdate-input" placeholder="Start Date">
						<input type="date" id="renting-enddate-input" placeholder="End Date">
					</div>
					<div class="mb-3">
						<input type="number" id="renting-bankcard-input" placeholder="Card number">
					</div>
					<div class="mb-3 double-input">
						<input type="number" id="renting-expdate-input" placeholder="Date of expiry">
						<input type="number" id="renting-cvc-input" placeholder="CVC">
					</div>
					<input class="rentsauna" type="submit" placeholder="Rent Sauna"></input>
				</form>
			</div>
		</div>
		`;
    this._successTemplate = `
		<div class="modal">
			<button class="close-modal">X</button>
			<h4>Successfully Rented</h4>
		</div>
		`;
  }

  Open(props) {
    this._modal.classList.add('active');
    this._modal.innerHTML = `
		<div class="modal">
			<button class="close-modal">X</button>
			<div class="modal-image" style="background-image: url(${props.photo})"></div>
			<div class="modal-content">
				<h1>${props.title}</h1>
				<h5>${props.price}€ / Day</h5>
				<p><i class="fa-solid fa-star"></i>${props.rating}</p>
				<p>${props.description}</p>
				<a href="" class="rent-sauna-btn">Rent</a>
			</div>
		</div>
		`;
    this._current = 'modal';
    this._open = true;
  }

  OpenLogin() {
    this._modal.classList.add('active-login');
    this._modal.innerHTML = this._loginTemplate;
    this._current = 'login';
    this._open = true;
  }

  Switch() {
    switch (this._current) {
      case 'login':
        this._modal.innerHTML = this._signupTemplate;
        this._current = 'signup';
        break;
      case 'signup':
        this._modal.innerHTML = this._loginTemplate;
        this._current = 'login';
        break;
    }
  }

  Close() {
    if (this._open && this._current === 'modal') {
      this._modal.innerHTML = ``;
      this._modal.classList.remove('active');
    }

    if (
      (this._open && this._current === 'login') ||
      this._current === 'signup'
    ) {
      this._modal.innerHTML = ``;
      this._modal.classList.remove('active-login');
    }

    if (this._open && this._current === 'renting') {
      this._modal.innerHTML = ``;
      this._modal.classList.remove('active-renting');
    }

    if (this._open && this._current === 'success') {
      this._modal.innerHTML = ``;
      this._modal.classList.remove('active-success');
    }
  }

  OpenRent() {
    this.Close();
    this._modal.classList.add('active-renting');
    this._modal.innerHTML = this._rentingTemplate;
    this._current = 'renting';
    this._open = true;

    const rentingForm = document.getElementById('renting-form');
    rentingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.OpenSuccess();
    });
  }

  OpenSuccess() {
    this.Close();
    this._modal.classList.add('active-success');
    this._modal.innerHTML = this._successTemplate;
    this._current = 'success';
    this._open = true;
  }
}

export default Modal;
