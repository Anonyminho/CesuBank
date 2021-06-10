const usersDB = [
  {
    usuario: 0,
    bloqueio: false,
    nome: 'Pedro',
    sobrenome: 'Henrique',
    data_de_nascimento: '2003-10-12',
    cpf: '001.220.123-10',
    email: 'pedrohenrique00@gmail.com',
    rg: '1002934',
    senha: '19756216',
    cep: '66094-555',
    saldo: 5000,
    chave1: "159456",
    chave2: "777777",
    chave3: ""
  },
  {
    usuario: 1,
    bloqueio: false,
    nome: 'Lucas',
    sobrenome: 'Ferreira',
    data_de_nascimento: '1999-01-21',
    cpf: '010.883.128.99',
    email: 'lucasferreira01@gmail.com',
    rg: '2112334',
    senha: '123456',
    cep: '66094-555',
    saldo: 15000,
    chave1: "11223344",
    chave2: "",
    chave3: ""
  },
  {
    usuario: 2,
    bloqueio: false,
    nome: 'João',
    sobrenome: 'Augusto',
    data_de_nascimento: '2002-06-11',
    cpf: '423.811.008.10',
    email: 'joaoaugusto02@gmail.com',
    rg: '2154866',
    senha: '654321',
    cep: '66094-555',
    saldo: 1000,
    chave1: "",
    chave2: "",
    chave3: ""
  }
];

let extratoDB = 
[
  {
    usuario: "",
    de_onde: "",
    para_onde: "",
    metodo: "",
    quantia: ""
  }
]

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(usersDB));
}
if (!localStorage.getItem('extrato')) {
  localStorage.setItem('extrato', JSON.stringify(extratoDB));
}