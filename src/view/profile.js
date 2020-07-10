export default () => {
  const viewProfile = `
            <p>Aquí editaras tus datos</p>
          `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('id', 'message');
  divElemt.innerHTML = viewProfile;
  return divElemt;
};
