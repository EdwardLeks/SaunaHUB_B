import '../styles/style.sass';
import Firebase from './Modules/Firebase';
import Modal from './Modules/Modal';
import UI from './Modules/UI';

let saunas = [];
let modal = new Modal();
let ui = new UI();
const fb = new Firebase();

fetch('https://saunahubrest.edwardleks.repl.co/saunas/all')
  .then((response) => response.json())
  .then((data) => createSaunas(data));

function createSaunas(data) {
  let saunaBlock = document.getElementById('saunas-section');

  data.forEach((sauna, i) => {
    saunas.push(sauna);
    saunaBlock.innerHTML += `
		<div class="col-3">
			<div class="sauna-card" style="background-image: url('${sauna.photo}');">
				<div class="sauna-description">
					<h4 class="sauna-link" id="${i}">${sauna.title}</h4>
					<p>${sauna.price}$</p>
				</div>
			</div>
		</div>
		`;
  });
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('sauna-link')) {
    let curID = e.target.id;
    modal.Open(saunas[curID]);
  }
  if (e.target.classList.contains('close-modal')) {
    modal.Close();
  }
  if (e.target.classList.contains('login-btn')) {
    modal.OpenLogin();
  }
  if (e.target.classList.contains('switch-login')) {
    modal.Switch();
  }
  if (e.target.classList.contains('login')) {
    fb.LogIn();
    modal.Close();
  }
  if (e.target.classList.contains('signup')) {
    fb.SignUp();
    modal.Close();
  }
  if (e.target.classList.contains('account-btn')) {
    fb.LogOut();
  }
  if (e.target.classList.contains('rent-sauna-btn')) {
    e.preventDefault();
    if (fb.accountStatus === 'loggedIn') {
      modal.OpenRent();
    } else if (fb.accountStatus === 'loggedOut') {
      alert('You must login to rent saunas');
    }
  }
});
