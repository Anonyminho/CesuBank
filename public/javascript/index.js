const links = [
  'https://www.cesupa.br/',
  '../public/landing-page.html',
  '../public/funcionalidades.html',
  '../public/criadores.html',
  '../public/cadastro.html',
  '../public/login.html',
];

// eslint-disable-next-line no-unused-vars
function redirect(index) {
  // eslint-disable-next-line no-undef
  window.location.href = links[index];
}
