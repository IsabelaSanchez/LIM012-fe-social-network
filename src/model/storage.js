// cargar imagen
export const uploadImage = (date, img) => {
  const postImageRef = firebase.storage().ref().child(`imagenes/${img.name}`);
  const metadata = { contentType: img.type };
  return postImageRef.put(img, metadata)
    .then(snapshot => (snapshot.ref.getDownloadURL()));
};
