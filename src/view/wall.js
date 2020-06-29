import { createPost, getPosts, logOut } from '../model/firebase_wall.js';
import { allPost } from './postpublish.js';

export default () => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const nameUser = user.displayName;
  const photoUser = user.photoURL;
  const viewWall = `
  <aside class="user">
      <div id="user-name">
      ${photoUser === null ? '<img class="circulo-profile" src="img/avatar-perfil.jpg"/>' : `<img class="circulo-profile" src="${photoUser}" alt=""/>`}
      ${nameUser === null ? `<p id="user-name-profile">${user.email}<p>` : `<p class="user-name-profile">${nameUser}</p>`}  
  </aside>
  <section class="post">
      <section id="post-new">
          <select id="post-new-privacity">
          <option value="privacity">Privado</option>
          <option value="public">Publico</option>
          </select>
          <textarea id="post-new-text" cols="" rows="3" placeholder="¿Qué pasos compartiras hoy?"></textarea>
          <div class="post-buttoms">
            <label class ="btn btn-file">
              <input type="file" name="" id="get-file" hidden>
              <img class="circulo-img bgcolor" src="img/image.svg" alt="Insertar imagen">
            </label>
            <button class="bgcolor" id="post-btn-publish">PUBLICAR</button>
          </div>
      </section>
      <section class="prueba" id="post-published">
      </section>
  </section>
    `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  divElemt.innerHTML = viewWall;
  const postSection = divElemt.querySelector('#post-published');
  getPosts((objArray) => {
    postSection.innerHTML = '';
    objArray.forEach((element) => {
      if (element.state !== 'privacity' || element.userId === user.uid) {
        db.collection('users').doc(element.userId).get()
          .then((doc) => {
            postSection.appendChild(allPost(element, doc.data()));
          });
      }
    });
  });

  const btnLogOut = document.querySelector('#btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#/';
        document.querySelector('#header').classList.remove('show');
        document.querySelector('#header').classList.add('hide');
        // changeHash('#/');
      });
  });

  const btnCreatePost = divElemt.querySelector('#post-btn-publish');
  if (user) {
    db.collection('users').doc(user.uid).set({
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    btnCreatePost.addEventListener('click', (event) => {
      event.preventDefault();
      const privacy = divElemt.querySelector('#post-new-privacity').value;
      const contentText = divElemt.querySelector('#post-new-text').value;
      divElemt.querySelector('#post-new-text').value = '';

      // Seccion cargar imagen en el post
      const file = divElemt.querySelector('#get-file');
      let imgPost = '';
      if (file.value !== '') {
        imgPost = file.value;
      }
      // Seccion crear nuevo post
      createPost(user.uid, contentText, privacy, imgPost)
        .then((result) => {
          getPosts(() => {
          });
        });
    });
  }
  return divElemt;
};
