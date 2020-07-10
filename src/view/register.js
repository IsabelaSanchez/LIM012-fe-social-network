import { newUser, verifEmail } from '../model/firebase_auth.js';
import { createUser } from '../model/firebase_user.js';

const showMessage = (txtmessage) => {
  const showWindow = document.createElement('div');
  showWindow.classList.add('showWindow');
  showWindow.textContent = txtmessage;
  document.body.appendChild(showWindow);
  setTimeout(() => {
    document.body.removeChild(showWindow);
  }, 4000);
};

const registerUser = (userEmail, userPass, userNames) => {
  newUser(userEmail, userPass)
    .then((result) => {
      showMessage(`⚠️ ${userNames}, enviamos un correo para activar su cuenta.`);
      verifEmail()
        .then(() => {
        // Verification email sent.
        })
        .catch((error) => {
          // error firebase por "sendEmailVerification()"
          showMessage(error.code);
        // Error occurred. Inspect error.code.
        });
      // guardar nombre del usuario en coleccion users
      createUser(result.user.uid, userNames, './img/avatar-perfil.jpg', 'Aprendiendo a bailar');
      window.location.hash = '';
    })
    .catch(() => {
      // error firebase por "createUserWithEmailAndPassword()", especificar a futuro.
      showMessage('⚠️Error al auntenticar usuario, verifique su correo, cuenta, clave o INICIE SESION, gracias.');
    });
  firebase.auth().signOut()
    .then(() => {
    })
    .catch((error) => {
      showMessage('Error al cerrar sesion', error.code);
    });
};

export default () => {
  const viewRegister = `
  <img class="logo" src="img/logo.png">
  <p id='texto'>¿Qué esperas para unirte? Somos la comunidad de baile más grande de internet. Aprende, comparte y disfruta en MOVES.</p>
  <img id="dance" src="img/dance.png">
  <p class='subtitle'>CREA TU CUENTA</p>
  <div><i class="far fa-user"></i><input class='allInputs' type="text" id ="names" placeholder ="Nombres y Apellidos"></div>
  <div><i class="fas fa-at"></i><input class='allInputs' type="text" id = "email" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input class='allInputs' type="password" id = "pass" placeholder="Contraseña"></div>
  <button type="button" id="btn-register" class='principal-button'>REGISTRATE</button>
  <span id="messages" class="messages"></span>
  <p class='lil-text'>¿Ya tienes una cuenta?</p><a id='just-link'href="">Inicia Sesión</a>
  </div>
`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-register');
  divElemt.innerHTML = viewRegister;

  const btnNewUser = divElemt.querySelector('#btn-register');
  btnNewUser.addEventListener(('click'), () => {
    const userNames = divElemt.querySelector('#names').value;
    const userEmail = divElemt.querySelector('#email').value;
    const userPass = divElemt.querySelector('#pass').value;
    if (userNames === '') {
      showMessage('⚠️ Por favor ingrese su nombre');
    } else if (userEmail === '') {
      showMessage('⚠️ Por favor ingrese un correo electronico');
    } else if (userPass === '') {
      showMessage('⚠️ Por favor ingrese su contraseña');
    } else {
      registerUser(userEmail, userPass, userNames);
    }
  });
  return divElemt;
};
