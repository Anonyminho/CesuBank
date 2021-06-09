let users;
let senha;

senha = ""

// FORMATAR INFORMAÇÃO DENTRO DO LOCAL STORAGE

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

// RESETAR O MINI ALERT DE ERRO
if (document.getElementById('erro')){
    setInterval(() => {
        document.getElementById('erro').innerText = ''
    }, 5000)
}

//APAGAR USUARIO ATUAL (LOCAL)
function apagar(){
    localStorage.removeItem('usuario_atual')
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
    senha = ""
    const confirm = document.getElementById('confirmar').value;

    for (let count = 0; count < dados.length; count++) {
        if (document.getElementById(dados[count]).value == "") {
            document.getElementById('erro').innerText = 'Informação inválida';
            break;
        } else {
            dados[count] = document.getElementById(dados[count]).value;
        }
    }

    var tamanho = dados[6].split('')

    if (dados[6] === confirm && tamanho.length >= 8) {
        users.push(
            {
                usuario: users.length,
                nome: dados[0],
                sobrenome: dados[1],
                data_de_nascimento: dados[2],
                cpf: dados[3],
                email: dados[4],
                rg: dados[5],
                senha: dados[6],
                cep: dados[7],
                saldo: "0",
                pix: ""
            });
        localStorage.setItem('users', JSON.stringify(users));
        location.href = './login.html';
    } else {
        document.getElementById('erro').innerText = 'Informação inválida';
    }
    if (tamanho.length < 8) {
        document.getElementById('erro').innerText = 'Senha muito curta,tem que ter mais que 8 caracteres';
    } else if (tamanho.length == "") {
        document.getElementById('erro').innerText = 'Senha inválida';
    }
}
// PICA
// TECLADO NUMERICO

function teclado(value) {
    var password = document.getElementById("password");
    var armazem;

    switch (value) {
        case 10:
            if (password.textContent) {
                armazem = password.textContent.split('')
                armazem.pop()
                armazem = armazem.join('')
                senha = senha.split('')
                senha.pop()
                senha = senha.join('')
                password.innerText = armazem
            } else {
                document.getElementById('erro').innerText = 'Ação Inválida'
            }
            break;
        case 11:
            if (password.textContent) {
                password.innerText = ""
                senha = ""
            } else {
                document.getElementById('erro').innerText = 'Ação Inválida'
            }
            break;
        default:
            password.innerText += "*"
            senha += value
            break;
    }
}

// LOGIN

function login() {
    let email = document.getElementById('email').value;;

    for (let c = 0; c < users.length; c++) {
        if (users[c].email == email && users[c].senha == senha) {
            localStorage.setItem("usuario_atual", JSON.stringify(users[c]))
            location.href = './minha-conta.html'
            break;
        } else if (users[c].email != email && users[c].senha == senha) {
            document.getElementById('erro').innerText = 'E-Mail não cadastrado'
        } else if (users[c].email == email && users[c].senha != senha) {
            document.getElementById('erro').innerText = 'Senha Inválida'
        } else {
            document.getElementById('erro').innerText = 'Usuário não cadastrado'
        }
    }

}

// MINHA CONTA

function myAccount() {

}