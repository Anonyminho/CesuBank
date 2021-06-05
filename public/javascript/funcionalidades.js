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

var invalido =
    `
<div id="invalido" style='background: rgba(0, 0, 0, 0.2);'>
    <section style='width: 100px; height: 75px;background: rgba(255, 255, 255, 0.9); display: flex; justify-content: center; align-items: center;'>
        <h1>Ação inválida</h1>
        <button>Okay</button>
    </section>
</div>
`

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
    infos.saldo = ""

    users.push(infos)

    console.log(users);

    localStorage.setItem("users", JSON.stringify(users))
}

//TECLADO NUMERICO

function teclado(key) {
    var values;
    var input = document.getElementById("senha");
    switch (key) {
        case 11:
            if (input.value) {
                values = input.value.split('')
                values.pop()
                input.value = values.join("")
                console.log(values);
            } else {
                break;
            }
            break;
        case 12:
            if (input.value) {
                input.value = ""
            } else {
                break;
            }
            break;
        default:
            if (input.value.split('').length < 8) {
                input.value += key
            } else {
                document.getElementById("acao").innerText = "Ação inválida"
            }
            break;
    }
}

//LOGIN DO USER

function login() {
    var login = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    for(let count = 0; counter < users.length; count++){
        
        console.log(users);
        if (senha == users[count].senha && login == users[count].email){
            redirect(6)
            break;
        } else if (senha != JSON.parse(users[count]).senha){
            document.getElementById("acao").innerText = "Senha Inválida"
        } else if (login != JSON.parse(users[count]).email){
            document.getElementById("acao").innerText = "Email Inválido"
        }
    }
}
