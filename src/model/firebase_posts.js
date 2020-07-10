export const createPost = (uid, contentText, privacy, imgPost) => firebase.firestore().collection('posts').add({
  userId: uid,
  content: contentText,
  likes: [],
  date: new Date(),
  state: privacy,
  img: imgPost,
});

// lee datos
export const getPosts = callback => firebase.firestore().collection('posts')
  .orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
    const output = [];
    querySnapshot.forEach((doc) => {
      output.push({
        id: doc.id,
        userId: doc.data().userId,
        content: doc.data().content,
        likes: doc.data().likes,
        date: doc.data().date.toDate(),
        state: doc.data().state,
        img: doc.data().img,
      });
    });
    callback(output);
  });

// actualiza post
export const updatePost = (idPost, newContent, newPrivacy) => {
  const refPost = firebase.firestore().collection('posts').doc(idPost);
  return refPost.update({
    content: newContent,
    state: newPrivacy,
  });
};

// delete post
export const deletePost = idPost => firebase.firestore().collection('posts').doc(idPost).delete();
// borrar subcoleccion comments si se elimina el post padre

export const updateLike = (id, likes) => firebase.firestore().collection('posts').doc(id).update({ likes });
