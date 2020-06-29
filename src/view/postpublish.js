import { updatePost, deletePost } from '../model/firebase_wall.js';

const ToEditPost = (btnSavePost, btnCancelPost, textAPost, selPrivPost, idDoc) => {
  const btnShow = (btnToShow) => {
    btnToShow.classList.add('showbtn');
    btnToShow.classList.remove('hide');
  };
  const btnHide = (btnToHide) => {
    btnToHide.classList.remove('showbtn');
    btnToHide.classList.add('hide');
  };
  const oldtextAPost = textAPost.value;
  textAPost.disabled = false;
  selPrivPost.disabled = false;
  btnShow(btnSavePost);
  btnShow(btnCancelPost);
  // evento click para grabar
  btnSavePost.addEventListener('click', () => {
    btnHide(btnSavePost);
    btnHide(btnCancelPost);
    updatePost(idDoc, textAPost.value, selPrivPost.value);
  });
  btnCancelPost.addEventListener('click', () => {
    btnHide(btnCancelPost);
    btnHide(btnSavePost);
    textAPost.value = oldtextAPost;
    textAPost.disabled = true;
    selPrivPost.disabled = true;
  });
};

export const allPost = (data, autor) => {
  const viewpostpublish = document.createElement('article');
  viewpostpublish.classList.add('post-format');
  const nameUser = autor.displayName;
  const photoUser = autor.photoURL;
  viewpostpublish.innerHTML = `
     <div>
        <div id="user-data">
          <img class="circulo-min" src="${photoUser}" alt="">
        <div>
        <h4 class="user-name">${nameUser}</h4>
        <div class='post-date'> 
        <p>${data.date}</p>
        <p> ${data.state}</p>
        </div>
        <div>
          <img id="btn-edit-post-${data.id}" class="showbtn circulo-imgbut bgcolor" src="img/edit.svg" alt="Editar Post">
          <img id="btn-save-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/save.svg" alt="Guardar cambios">
          <img id="btn-cancel-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/x.svg" alt="Cancelar cambios">
          <a id='btn-delete-${data.id}'><img class="mini-img bgcolor" src="img/trash.png" alt="Insertar imagen"></a>
          <select class='select-edited' id="selec-privacy-${data.id}" disabled="true">
          <option value="privacity">🔒</option>
          <option value="public">🌎</option>
          </select>
        </div>
        </div>
        </div>
      </div>
        <textarea id="textarea-${data.id}" class="only-lines" disabled="true">${data.content}</textarea>
        <span class="post-show-like-comments">${data.likes}</span>
    `;
  // actualizar post
  const btnEditPost = viewpostpublish.querySelector(`#btn-edit-post-${data.id}`);
  const btnSavePost = viewpostpublish.querySelector(`#btn-save-post-${data.id}`);
  const btnCancelPost = viewpostpublish.querySelector(`#btn-cancel-post-${data.id}`);
  const textAPost = viewpostpublish.querySelector(`#textarea-${data.id}`);
  const selPrivPost = viewpostpublish.querySelector(`#selec-privacy-${data.id}`);
  // evento click para editar
  btnEditPost.addEventListener('click', () => {
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('showbtn');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('hide');
    ToEditPost(btnSavePost, btnCancelPost, textAPost, selPrivPost, data.id);
  });
  // const btnDeletePost = document.querySelector(`#btn-delete-${data.id}`);
  viewpostpublish.querySelector(`#btn-delete-${data.id}`).addEventListener('click', () => deletePost(data.id));

  // btnDeletePost.addEventListener('click', () => {
  //   deletePost(data.id);
  //   console.log(data.id);
  // });
  // console.log(data.content);
  // console.log(viewpostpublish);
  // console.log(data);
  return viewpostpublish;
};
