import { newUser, verifEmail } from '../model/firebase.js';

export default () => {
  const viewRegister = `
  <img class="logo" src="img/logo.png">
  <p id='texto'>¿Qué esperas para unirte? Somos la comunidad de baile más grande de internet. Aprende, comparte y disfruta en MOVES.</p>
  <img id="dance" src="img/dance.png">
  <p class='subtitle'>CREA TU CUENTA</p>
  <div><i class="far fa-user"></i><input type="text" id ="names" placeholder ="Nombres y Apellidos"></div>
  <div><i class="fas fa-at"></i><input type="text" id = "email" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input type="password" id = "pass" placeholder="Contraseña"></div>
  <button type="button" id="btn-register" class='principal-button'><a class='links-on-buttons' href="#/register">REGISTRATE</a></button>
  <span id="messages" class="messages"></span>
  <p class='lil-text'>¿Ya tienes una cuenta?</p><a id='just-link'href="#/">Inicia Sesión</a>
  </div>
`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-register');
  divElemt.innerHTML = viewRegister;

  const btnNewUser = divElemt.querySelector('#btn-register');
  if (btnNewUser) {
    console.log('hola!!')
    btnNewUser.addEventListener(('click'), () => {
      const names = divElemt.querySelector('#names');
      const email = divElemt.querySelector('#email');
      const pass = divElemt.querySelector('#pass');
      const userNames = names.value;
      const userEmail = email.value;
      const userPass = pass.value;
      if (userNames === '') {
        divElemt.querySelector('#messages').innerHTML = '⚠️ Por favor ingrese su nombre';
      } else if (userEmail === '') {
        divElemt.querySelector('#messages').innerHTML = '⚠️ Por favor ingrese un correo electronico';
      } else if (userPass === '') {
        divElemt.querySelector('#messages').innerHTML = '⚠️ Por favor ingrese su contraeña';
      } else {
        newUser(userEmail, userPass);
        verifEmail(userEmail);
        divElemt.querySelector('#messages').innerHTML = `${userNames}, te has registrado correctamente, hemos enviado un email de confirmacion a tu direccion de correo.`;
      }
    });
  }
  return divElemt;
};
