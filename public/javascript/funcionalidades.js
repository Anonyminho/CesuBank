if (localStorage.getItem('users')) {
    users = localStorage.getItem('users').split('},{');
}

for (var c = 0; c < users.length; c++) {
    if (users[c][0] != '{') {
        users[c] = '{' + users[c];
    }

    if (users[c][users[c].length - 1] != '}') {
        users[c] += '}';
    }
}   

// CADASTRO DO USUARIO
var counter;
counter = 0

function cadastrar() {

    // ADD INFOS EM ORDEM
    var dados = ["nome", "sobrenome", "cpf", "rg", "data_de_nasc", "email", "senha", "cep"]
    for (let count = 0; count < dados.length; count++) {
        if (count == 4) {
            dados[count] = document.getElementById(dados[count]).value
            dados[count] = dados[count].split("/").reverse().join("/")
        } else {
            dados[count] = document.getElementById(dados[count]).value
        }
        console.log(dados[count]);
    }

    // ADD INFOS A LISTA DE CADASTROS
    var infos = {}
    infos.usuario = (users.length + 1)
    infos.nome = dados[0]
    infos.sobrenome = dados[1]
    infos.cpf = dados[2]
    infos.rg = dados[3]
    infos.nascimento = dados[4]
    infos.email = dados[5]
    infos.senha = dados[6]
    infos.cep = dados[7]

    users.push(infos)

    console.log(users);

    localStorage.setItem("users", JSON.stringify(users))
}

function login() {

}
