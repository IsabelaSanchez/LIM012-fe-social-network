import {
  updatePost, deletePost, updateLike, addComment, getComments, getUser, deleteComment,
} from '../model/firebase_wall.js';

// const showDate = (currentdate) => {
//   console.log('fecha que viene');
//   console.log(new Date(currentdate).toloc);
//   // const newdate = currentdate.getDate();
//   // // const newdate = `${currentdate.getDate()}-${currentdate.getMonth()}-${currentdate.getFullYear()}`;
//   // console.log('fecha formateada');
//   // console.log(newdate);
//   // return newdate;
// };

const ToEditPost = (btnSavePost, btnCancelPost, idDoc) => {
  const textAPost = document.querySelector(`#textarea-${idDoc}`);
  const selPrivPost = document.querySelector(`#selec-privacy-${idDoc}`);
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
    // btnEditPost = document.querySelector();
    btnHide(btnCancelPost);
    btnHide(btnSavePost);
    // btnShow(btnEditPost);
    textAPost.value = oldtextAPost;
    textAPost.disabled = true;
    selPrivPost.disabled = true;
  });
};

const toEditComment = (btnE, btnD, IdDocComment) => {
  const textComm = document.querySelector(`txtNewComm-${IdDocComment}`).value;
  const oldTextComent = textComm;
  console.log(oldTextComent);
};

export const allPost = (data, autor) => {
  const userActual = firebase.auth().currentUser;
  const viewpostpublish = document.createElement('article');
  viewpostpublish.classList.add('post-format');
  const nameUser = autor.displayName;
  const photoUser = autor.photoURL;
  const imgPost = data.img;
  viewpostpublish.innerHTML = `
     <div>
        <div id="user-data">
          <img class="circulo-min" src="${photoUser}" alt="">
          <div id='infoUserPost'>
            <div id='infoAlign'>
              <h4>${nameUser}</h4>
              <div id='miniButtons'>
                  <img id="btn-edit-post-${data.id}" class="showbtn circulo-imgbut bgcolor" src="img/edit.svg" alt="Editar Post">
                  <img id="btn-save-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/save.svg" alt="Guardar cambios">
                  <img id="btn-cancel-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/x.svg" alt="Cancelar cambios">
                  <a id='btn-delete-${data.id}'><img class="mini-img bgcolor" src="img/trash.png" alt="Insertar imagen"></a>
              </div>
            </div>
              <div class='post-date'> 
                <p>${data.date}</p>
                <select class='select-edited' id="selec-privacy-${data.id}" disabled="true">
                  </select>
              </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <textarea id="textarea-${data.id}" class="only-lines" disabled="true">${data.content}</textarea>
  <div class="image-post" id ="get-file-upload" type="file" accept="image/*">
    ${(data.img !== undefined) ? `<img class="image-post" src="${imgPost}" alt=""/>` : ''}
  </div>
  <div class="btns-likes-comments">
    <img id ="btnLike-${data.id}" class="mini-img" src="img/like.svg" alt="likes" title="likes"/>
    <p class="counter-text">${data.likes.length}</p><p class="counter-text">Likes</p>
    <img id="btn-show-comm" class="i-send" src="img/message-square.svg" alt="Mostrar Comentarios">
    <span> Comentarios </span>
  </div>
  <section class="comments" class="hide">
    <div class="new-comment">
      <img class="circulo-min" src="${userActual.photoURL}" alt="">
      <input type="text" class="bg" id="txtNewComm-${data.id}" placeholder="Escriba un comentario">
      <img id="btn-save-comm-${data.id}" class="i-send" src="img/send.svg" alt="Grabar Comentario">
    </div>
    <section class="old-comments"></section>
  </section>
  `;
  // post: cargar valor de privacidad en select
  const selectPriv = viewpostpublish.querySelector(`#selec-privacy-${data.id}`);
  const optionpublic = document.createElement('option');
  const optionprivac = document.createElement('option');
  optionpublic.value = 'public';
  optionprivac.value = 'privacity';
  optionpublic.innerHTML = '🌎';
  optionprivac.innerHTML = '🔒';
  if (data.state === 'privacity') {
    selectPriv.appendChild(optionprivac);
    selectPriv.appendChild(optionpublic);
  } else {
    selectPriv.appendChild(optionpublic);
    selectPriv.appendChild(optionprivac);
  }

  const btnLike = viewpostpublish.querySelector(`#btnLike-${data.id}`);
  btnLike.addEventListener('click', () => {
    // event.preventDefault();
    const arrayLikes = data.likes.indexOf(userActual.uid);
    if (arrayLikes === -1) {
      data.likes.push(userActual.uid);
      updateLike(data.id, data.likes);
    } else {
      data.likes.splice(arrayLikes, 1);
      updateLike(data.id, data.likes);
    }
    console.log(data.likes);
    console.log(userActual.uid);
    console.log(data.likes.length);
  });

  // actualizar post
  const btnEditPost = viewpostpublish.querySelector(`#btn-edit-post-${data.id}`);
  const btnSavePost = viewpostpublish.querySelector(`#btn-save-post-${data.id}`);
  const btnCancelPost = viewpostpublish.querySelector(`#btn-cancel-post-${data.id}`);
  btnEditPost.addEventListener('click', () => {
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('showbtn');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('hide');
    ToEditPost(btnSavePost, btnCancelPost, data.id);
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('hide');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('showbtn');
  });

  // eliminar post
  viewpostpublish.querySelector(`#btn-delete-${data.id}`).addEventListener('click', () => deletePost(data.id));

  // comentarios: agregar nuevo comentario
  const btnSaveComment = viewpostpublish.querySelector(`#btn-save-comm-${data.id}`);
  btnSaveComment.addEventListener('click', () => {
    const NewComm = viewpostpublish.querySelector(`#txtNewComm-${data.id}`).value;
    if (NewComm) {
      addComment(NewComm, userActual.uid, data.id);
    }
    viewpostpublish.querySelector(`#txtNewComm-${data.id}`).value = '';
    viewpostpublish.querySelector(`#txtNewComm-${data.id}`).focus();
  });

  // comentarios: mostrar seccion de comentarios
  const secComments = viewpostpublish.querySelector('.comments');
  const btnShowComments = viewpostpublish.querySelector('#btn-show-comm');
  btnShowComments.addEventListener('click', () => {
    secComments.classList.toggle('hide');
  });

  // comentarios: leer y mostrar comentarios anteriores
  const secOldComments = viewpostpublish.querySelector('.old-comments');
  getComments(data.id, (arrayComm) => {
    // secOldComments.innerHTML = '';
    arrayComm.forEach((element) => {
      console.log(element);
      const artElement = document.createElement('article');
      artElement.classList.add('comment-main');
      getUser(element.commUserId)
        .then((docUser) => {
          artElement.innerHTML = `
      <img class="circulo-min" src="" alt="">
      <div class="comment-data bg">
        <div>
          <h4 class="comment-name">nombre</h4>
          <span class="comment-date">04jul2020 11:30</span>
          <p id="txtNewComm-${element.commDocId}">${element.commTexto}</p>
        </div>
      </div>
      <div>
        <img class="i-mnu-options" id="options" src="img/more-horizontal.svg">
      </div>
      <div class="tooltip-container hide">
        <div class="tooltip">
          <div class="opt" id=btn-edit-comm-${element.commDocId}> <i class="fas fa-edit icon-tool"></i> Editar</div>
          <div class="opt" id=btn-del-comm-${element.commDocId}> <i class="fas fa-trash-alt icon-tool"></i> Borrar</div>
        </div>
      <div>
        `;
          // comentarios: mostrar menu editar y eliminar
          // const mnuOptions = artElement.querySelector('#options');
          // mnuOptions.addEventListener(('click'), () => {
          //   const toolContainer = artElement.querySelector('.tooltip-container');
          //   toolContainer.classList.toggle('hide');
          // });
          // // comentarios: editar texto del comentario
          // const editComm = artElement.querySelector(`btn-edit-comm-${element.commDocId}`);
          // editComm.addEventListener('click', () => {
          //   toEditComment(element.commDocId);
          // });

          // // comentarios: eliminar comentario
          // const delComm = artElement.querySelector(`btn-del-comm-${element.commDocId}`);
          // delComm.addEventListener('click', () => {
          //   deleteComment(element.commDocId);
          // });
          secOldComments.appendChild(artElement);
        });
    });
  });
  return viewpostpublish;
};


// btnDeletePost.addEventListener('click', () => {
//   deletePost(data.id);
//   console.log(data.id);
// });
// console.log(data.content);
// console.log(viewpostpublish);
// console.log(data);
