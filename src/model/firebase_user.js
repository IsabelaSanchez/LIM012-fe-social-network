// actualizar datos del usuario loguedado por gmail y facebook
export const updateUser = (idDoc, newUserName, newUserPhoto, newInfoUser) => firebase.firestore().collection('users').doc(idDoc).update({
  displayName: newUserName,
  infoUser: newInfoUser,
  photoURL: newUserPhoto,
});

export const createUser = (idDoc, newUserName, newUserPhoto, newInfoUser) => firebase.firestore().collection('users').doc(idDoc).set({
  displayName: newUserName,
  infoUser: newInfoUser,
  photoURL: newUserPhoto,
});

export const updateInfoUser = (idDoc, newUserName, newInfoUser) => firebase.firestore().collection('users').doc(idDoc).update({
  displayName: newUserName,
  infoUser: newInfoUser,
});

// leer datos del usuario
export const getUser = docUser => firebase.firestore().collection('users').doc(docUser).get();
