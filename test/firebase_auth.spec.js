import { logIn, googleSignIn, loginFacebook } from '../src/model/firebase_auth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('logIn', () => {
  it('debería poder iniciar sesion', () => logIn('acuario@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('acuario@gmail.com');
    }));
});

describe('googleSignIn', () => {
  it('debería ser una funcion', () => {
    expect(typeof googleSignIn).toBe('function');
  });

  it('debería poder iniciar sesion utilizando una cuenta de google', () => {
    const input = [{ providerId: 'google.com' }];
    return googleSignIn().then(() => {
      expect(mockauth.getAuth().providerData).toEqual(expect.arrayContaining(input));
    });
  });
});

describe('loginFacebook ', () => {
  it('debería ser una funcion', () => {
    expect(typeof loginFacebook).toBe('function');
  });

  it('debería poder iniciar sesion utilizando una cuenta de google', () => {
    const input = [{ providerId: 'facebook.com' }];
    return loginFacebook().then(() => {
      expect(mockauth.getAuth().providerData).toEqual(expect.arrayContaining(input));
    });
  });
});
