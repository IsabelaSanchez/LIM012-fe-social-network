import { changeView } from './controller/router.js';

export const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);


const firebaseConfig = {
  apiKey: 'AIzaSyB1D4hXOGoyu4izGlp_CdZSWlIH0J0ihQc',
  authDomain: 'moves-a5e09.firebaseapp.com',
  databaseURL: 'https://moves-a5e09.firebaseio.com',
  projectId: 'moves-a5e09',
  storageBucket: 'gs://moves-a5e09.appspot.com',
  messagingSenderId: '770078226800',
  appId: '1:770078226800:web:1fa5e66ecca2adf3d077b5',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.hash = '#/wall';
  } else {
    window.location.hash = '#';
    // apagar observador
  }
});

export const storage = firebase.storage();

export const storageRef = storage.ref('');
