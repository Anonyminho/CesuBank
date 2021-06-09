// FORMATAR INFORMAÇÃO DENTRO DO LOCAL STORAGE
let users;

if (localStorage.getItem('users')) {
  users = localStorage.getItem('users').split('},{');
}

for (let counter = 0; counter < users.length; counter++) {
  if (users[counter][0] !== '{' && users[counter][0] !== '[') {
    users[counter] = `{${users[counter]}`;
  }

  if (
    users[counter][users[counter].length - 1] !== '}' &&
    users[counter][users[counter].length - 1] !== ']'
  ) {
    users[counter] += '}';
  }

  if (users[counter][0] === '[') {
    users[counter] = users[counter].slice(1);
  }

  if (users[counter][users[counter].length - 1] === ']') {
    users[counter] = users[counter].slice(0, users[counter].length - 1);
  }

  users[counter] = JSON.parse(users[counter]);
}

// CADASTRO DE USUARIO

function cadastro() {
  // eslint-disable-next-line prefer-const
  let dados = [
    'nome',
    'sobrenome',
    'data_de_nascimento',
    'cpf',
    'email',
    'rg',
    'senha',
    'cep',
  ];
  const confirm = document.getElementById('confirmar').value;

  for (let count = 0; count < dados.length; count++) {
    dados[count] = document.getElementById(dados[count]).value;
  }

  if (dados[6] === confirm) {
    users.push({
      usuario: users.length,
      nome: dados[0],
      sobrenome: dados[1],
      data_de_nascimento: dados[2],
      cpf: dados[3],
      email: dados[4],
      rg: dados[5],
      senha: dados[6],
      cep: dados[7],
    });
    localStorage.setItem('users', JSON.stringify(users));
    location.href = './login.html';
  } else {
    document.getElementById('erro').innerText = 'Informação inválida';
  }
}

// LOGIN

function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  for (let count = 0; count < users.length; count++) {
    console.log(JSON.parse(users[count]));
  }
}
