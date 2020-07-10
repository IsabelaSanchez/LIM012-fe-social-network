export const addComment = (newTextComm, currentUserName, currentUserPhotoUrl, currentPostId) => firebase.firestore().collection('comments')
  .add({
    commText: newTextComm,
    commDate: new Date(),
    commUserName: currentUserName,
    commUserPhoto: currentUserPhotoUrl,
    commPostId: currentPostId,
  });

// leer comentarios usando where
export const getComments = (idDocPost, callback) => firebase.firestore().collection('comments')
  .where('commPostId', '==', idDocPost)
  .orderBy('commDate', 'desc')
  .onSnapshot((docsCommentSnapshot) => {
    const output = [];
    docsCommentSnapshot.forEach((doc) => {
      output.push({
        commDocId: doc.id,
        commText: doc.data().commText,
        commDate: doc.data().commDate.toDate(),
        commUserName: doc.data().commUserName,
        commUserPhoto: doc.data().commUserPhoto,
        commPostId: doc.data().commPostId,
      });
    });
    callback(output);
  });

// actualizar comentario
export const updateComment = (idComm, newTextComm) => firebase.firestore().collection('comments')
  .doc(idComm)
  .update({
    commText: newTextComm,
  });

// eliminar comentario
export const deleteComment = idComm => firebase.firestore().collection('comments')
  .doc(idComm)
  .delete();
