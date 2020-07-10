/* import { createPost, getPosts, deletePost } from '../src/model/firebase_posts.js';

const firebasemock = require('firebase-mock');

const fixtureData = {
  __collection__: {
    notes: {
      __doc__: {
        abc1d: {
          title: 'terminar la pildora',
          complete: false,
        },
      },
    },
  },
};

global.firebase = new firebasemock(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('lista de notas', () => {
  it('Debería poder crear un post', done => createPost('preparar la pildora')
    .then(() => getPosts(
      (data) => {
        const result = data.find(note => note.title === 'preparar la pildora');
        expect(result.title).toBe('preparar la pildora');
        done();
      },
    )));
  it('Debería poder eliminar un post', done => deletePost('abc1d')
    .then(() => getPosts(
      (data) => {
        const result = data.find(note => note.id === 'abc1d');
        expect(result).toBe(undefined);
        done();
      },
    )));
});
*/
