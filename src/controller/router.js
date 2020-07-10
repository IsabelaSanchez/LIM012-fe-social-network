import { components } from '../view/index.js';

// Funcion para cambio de la url, asociado a las opciones register, etc
const changeView = (hash) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (hash) {
    case '':
    case '/':
    case '#':
    case '#/':
      container.appendChild(components.hom());
      break;
    case '#/register':
      container.appendChild(components.regis());
      break;
    case '#/wall': {
      const headerElem = document.querySelector('header');
      headerElem.classList.remove('hide');
      headerElem.classList.add('show');
      const navElem = document.querySelector('nav');
      navElem.classList.remove('hide');
      navElem.classList.add('show');
      container.appendChild(components.wal(false));
      // container.appendChild(components.wal());
    }
      break;
    case '#/profile':
      container.appendChild(components.wal(true));
      break;
    default:
      container.appendChild(components.different());
  }
};
export { changeView };

// comen wall
// la idea es que aqui se muestre el header //
// const cab = document.querySelector('header');
// cab.classList.add('show');
