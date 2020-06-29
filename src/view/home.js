import { logIn, googleSignIn, loginFacebook } from '../model/firebase.js';

export const changeHash = (hash) => {
  window.location.hash = hash;
};

export default () => {
  const viewHome = `
  <img class="logo" src="img/logo.png">
  <p id='texto'>¿Cuál baile practicas?  
  Comparte tus mejores pasos en la comunidad de baile más grande de internet.</p>
  <img id="dance" src="img/dance.png">
  <p class='subtitle'>INICIA SESIÓN</p>
  <div><i class="far fa-user"></i><input id ="email" type="text" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input id ="pass" type="password" placeholder="Contraseña"></div>
  <button id = "btn-login" class='principal-button'><a class='links-on-buttons'>INGRESAR</a></button>
  <span id="messages" class="messages"></span>
  <p class='lil-text'>O ingresa con...</p>
  <div>
  <a class='links-on-buttons'><img id="face" src="img/facebook.png"></a>
  <a class='links-on-buttons'><img id="gmail" src="img/gmail.png"></a>
  </div>
  <p class='lil-text'>¿No tienes una cuenta?</p><a id='just-link'href="#/register"> REGISTRATE</a>
  `;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-register');
  divElemt.innerHTML = viewHome;
  const btnLogIn = divElemt.querySelector('#btn-login');
  btnLogIn.addEventListener(('click'), () => {
    const email = divElemt.querySelector('#email');
    const pass = divElemt.querySelector('#pass');
    const logInEmail = email.value;
    const logInPass = pass.value;
    logIn(logInEmail, logInPass)
      .then(() => changeHash('#/wall'))
      .catch(() => { divElemt.querySelector('#messages').innerHTML = '⚠️ Usuario no registrado'; });
  });
  // googlesignin function
  const btngoogleSignIn = divElemt.querySelector('#gmail');
  btngoogleSignIn.addEventListener(('click'), () => {
    googleSignIn()
      .then((result) => {
        changeHash('#/wall');
        console.log(result);
        console.log('Cuenta de Google registrada!!!');
      }).catch((error) => {
        console.log(error);
        console.log('No se registro la cuenta :c');
      });
  });

  const btnLoginFAcebook = divElemt.querySelector('#face');
  btnLoginFAcebook.addEventListener(('click'), () => {
    loginFacebook()
      .then((result) => {
        changeHash('#/wall');
      })
      .catch(() => {});
  });
  return divElemt;
};
