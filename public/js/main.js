let users;
let senha;
let senha_nova;
let usuario_atual;
let numero_conta;
senha = ""
senha_nova = ""

var erros = 0;

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
if (localStorage.getItem('extrato')) {
    extrato = localStorage.getItem('extrato').split('},{');
}

for (let counter = 0; counter < extrato.length; counter++) {
    if (extrato[counter][0] !== '{' && extrato[counter][0] !== '[') {
        extrato[counter] = `{${extrato[counter]}`;
    }

    if (
        extrato[counter][extrato[counter].length - 1] !== '}' &&
        extrato[counter][extrato[counter].length - 1] !== ']'
    ) {
        extrato[counter] += '}';
    }

    if (extrato[counter][0] === '[') {
        extrato[counter] = extrato[counter].slice(1);
    }

    if (extrato[counter][extrato[counter].length - 1] === ']') {
        extrato[counter] = extrato[counter].slice(0, extrato[counter].length - 1);
    }

    extrato[counter] = JSON.parse(extrato[counter]);
}

usuario_atual = localStorage.getItem('usuario_atual')
usuario_atual = JSON.parse(usuario_atual)

if (document.getElementById('erro')) {
    setInterval(() => {
        document.getElementById('erro').innerText = ''
    }, 5000)
}

function apagar() {
    localStorage.removeItem('usuario_atual')
}

function cadastro() {
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

    var tamanho = dados[6].split('');
    var result;
    for (let c = 0; c < users.length; c++) {
        if (users[c].email == dados[4] || users[c].cpf == dados[3] || users[c].rg == dados[5]) {
            result = true
            break;
        } else {
            result = false
        }
    }

    if (dados[6] === confirm && tamanho.length >= 8 && result == false) {
        users.push(
            {
                usuario: users.length,
                bloqueio: false,
                nome: dados[0],
                sobrenome: dados[1],
                data_de_nascimento: dados[2],
                cpf: dados[3],
                email: dados[4],
                rg: dados[5],
                senha: dados[6],
                cep: dados[7],
                saldo: 0.00,
                chave1: "",
                chave2: "",
                chave3: ""
            });
        localStorage.setItem('users', JSON.stringify(users));
        location.href = './login.html';
    } else if (result == true) {
        document.getElementById('erro').innerText = 'Usuario já cadastrado';
    } else {
        document.getElementById('erro').innerText = 'Informação inválida';
    }
    if (tamanho.length < 8) {
        document.getElementById('erro').innerText = 'Senha muito curta,tem que ter mais que 8 caracteres';
    } else if (tamanho.length == "") {
        document.getElementById('erro').innerText = 'Senha inválida';
    }
}

function teclado(value, id) {
    var password = document.getElementById("password");
    var NewPassword = document.getElementById("NewPassword");
    
    let local = [password, NewPassword]
    let armazem = ["", ""]

    if (id == 0) {
        switch (value) {
            case 10:
                if (local[id].textContent) {
                    armazem[id] = local[id].textContent.split('')
                    armazem[id].pop()
                    armazem[id] = armazem[id].join('')
                    senha = senha.split('')
                    senha.pop()
                    senha = senha.join('')
                    local[id].innerText = armazem[id]
                } else {
                    document.getElementById('erro').innerText = 'Ação Inválida'
                }
                break;
            case 11:
                if (local[id].textContent) {
                    local[id].innerText = ""
                    senha = ""
                } else {
                    document.getElementById('erro').innerText = 'Ação Inválida'
                }
                break;
            default:
                local[id].innerText += "*"
                senha += value
                break;
        }
    }
    if (id == 1) {
        switch (value) {
            case 10:
                if (local[id].textContent) {
                    armazem[id] = local[id].textContent.split('')
                    armazem[id].pop()
                    armazem[id] = armazem[id].join('')
                    senha_nova = senha_nova.split('')
                    senha.pop()
                    senha_nova = senha_nova.join('')
                    local[id].innerText = armazem[id]
                } else {
                    document.getElementById('erro').innerText = 'Ação Inválida'
                }
                break;
            case 11:
                if (local[id].textContent) {
                    local[id].innerText = ""
                    senha_nova = ""
                } else {
                    document.getElementById('erro').innerText = 'Ação Inválida'
                }
                break;
            default:
                local[id].innerText += "*"
                senha_nova += value
                break;
        }
    }
}

function login() {
    var email = document.getElementById('email').value;
    if (isBlocked() == false) {
        for (let c = 0; c < users.length; c++) {
            if (users[c].email == email && users[c].senha == senha && users[c].bloqueio == false) {
                localStorage.setItem("usuario_atual", JSON.stringify(users[c]))
                location.href = './minha-conta.html'
                break;
            } else if (users[c].email != email && users[c].senha == senha) {
                document.getElementById('erro').innerText = 'E-Mail não cadastrado'
                break;
            } else if (users[c].email == email && users[c].senha != senha) {
                bloqueioForca()
                document.getElementById('erro').innerText = 'Senha errada'
                break;
            } else {
                document.getElementById('erro').innerText = 'Usuário não cadastrado'
            }
        }
    } else {
        document.getElementById('erro').innerText = 'Conta bloqueada, dirija-se a sua agencia bancária'
    }
}

function myAccount() {
    usuario_atual = localStorage.getItem('usuario_atual')
    usuario_atual = JSON.parse(usuario_atual)
    document.getElementById('nameUser').innerText = `${usuario_atual.nome} ${usuario_atual.sobrenome}`
}

function meuSaldo() {
    usuario_atual = localStorage.getItem('usuario_atual')
    usuario_atual = JSON.parse(usuario_atual)
    document.getElementById('saldo').innerText = `${usuario_atual.saldo}`
}

function infos() {
    document.getElementById('nome').innerText = usuario_atual.nome
    document.getElementById('sobrenome').innerText = usuario_atual.sobrenome
    document.getElementById('email').innerText = usuario_atual.email
    document.getElementById('data_de_nascimento').innerText = usuario_atual.data_de_nascimento
    document.getElementById('cpf').innerText = usuario_atual.cpf
    document.getElementById('rg').innerText = usuario_atual.rg
    document.getElementById('cep').innerText = usuario_atual.cep
    document.getElementById('numero').innerText = usuario_atual.usuario

}

function mostrarChaves() {
    var chaves = [usuario_atual.chave1, usuario_atual.chave2, usuario_atual.chave3]
    if (chaves[0] != "" || chaves[1] != "" || chaves[2] != "") {
        for (let c = 0; c < chaves.length; c++) {
            if (chaves[0] != "") {
                document.getElementById('chave1').innerText = chaves[0]
            }
            if (chaves[1] != "") {
                document.getElementById('chave2').innerText = chaves[1]
            }
            if (chaves[2] != "") {
                document.getElementById('chave3').innerText = chaves[2]
            }
        }
    } else {
        document.getElementById('displayChaves').innerHTML = "<p>Você ainda não criou uma chave PIX.</p>"
    }
}

function criarChaves(id) {
    debugger
    let letras = ["a", "e", "i", "o", "u", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
    let caracteres = ["@", "#", "$", "*", "&"];

    var chave = []

    if (!document.getElementById('pix').value) {
        for (let c = 0; c < 2; c++) {
            let letra = letras[Math.floor(Math.random() * letras.length)]
            let especial = caracteres[Math.floor(Math.random() * caracteres.length)]
            let num = Math.floor(Math.random() * 9)

            chave.push(letra)
            chave.push(especial)
            chave.push(num)
        }
        var chave_final = randomizar(chave);
        chave_final = chave_final.join('')
    }
    if (document.getElementById('pix').value) {
        var chave_final = document.getElementById('pix').value
    }
    if (usuario_atual.chave1 == "" && usuario_atual.chave1 != chave_final && usuario_atual.chave2 != chave_final && usuario_atual.chave3 != chave_final) {
        usuario_atual.chave1 = chave_final;
        document.getElementById('pix').value = chave_final

        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].chave1 = chave_final
                localStorage.setItem('users', JSON.stringify(users))
            }
        }

    } else if (usuario_atual.chave2 == "" && usuario_atual.chave1 != chave_final && usuario_atual.chave2 != chave_final && usuario_atual.chave3 != chave_final) {
        usuario_atual.chave2 = chave_final;
        document.getElementById('pix').value = chave_final

        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].chave2 = chave_final
                localStorage.setItem('users', JSON.stringify(users))
                break;
            }
        }

    } else if (usuario_atual.chave3 == "" && usuario_atual.chave1 != chave_final && usuario_atual.chave2 != chave_final && usuario_atual.chave3 != chave_final) {
        usuario_atual.chave3 = chave_final;
        document.getElementById('pix').value = chave_final

        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].chave3 = chave_final
                localStorage.setItem('users', JSON.stringify(users))
                break;
            }
        }

    } else {
        document.getElementById('pix').value = "Não foi possivel criar a chave."
    }


    function randomizar(array) {
        var tamanho = array.length;
        var j;
        var armazem;

        for (let c = 0; c < tamanho; c++) {
            j = Math.floor(Math.random() * (tamanho + 1));
            armazem = array[tamanho];
            array[tamanho] = array[j];
            array[j] = armazem;
        }

        return array
    }
}

function mudarSenha() {
    erros = 0;
    if (senha == usuario_atual.senha) {
        usuario_atual.senha = senha_nova
        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].senha = senha_nova
                localStorage.setItem('users', JSON.stringify(users))
            }
        }
        document.getElementById('erro').style.color = 'green'
        document.getElementById('erro').innerText = 'Senha Alterada com SUCESSO'
        document.getElementById('password').innerText = ""
        document.getElementById('NewPassword').innerText = ""
    } else {
        bloqueioForca()
        document.getElementById('erro').innerText = 'Senha errada'
    }
}

function bloqueioVoluntario() {
    if (usuario_atual.senha == senha && usuario_atual.usuario == document.getElementById('numero').value) {
        usuario_atual.bloqueio = true
        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].bloqueio = true
                localStorage.setItem('users', JSON.stringify(users))
            }
        }
        location.href = './login.html'
    }
}

function isBlocked() {
    var email = document.getElementById('email').value;
    for (let c = 0; c < users.length; c++) {
        if (users[c].email == email) {
            if (users[c].bloqueio == true) {
                return true
            }
            if (users[c].bloqueio == false) {
                return false
            }
        }
    }
}

function bloqueioForca() {
    var user;
    var email;

    if(document.getElementById('email')){
        email = document.getElementById('email').value
    }
    if(usuario_atual){
        user = usuario_atual.usuario
    }
    if (erros == 3) {
        document.getElementById('erro').innerText = "Conta bloqueada, dirija-se a sua agencia bancária"
        for (let c = 0; c < users.length; c++) {
            if (users[c].email == email) {
                users[c].bloqueio = true
                localStorage.setItem('users', JSON.stringify(users))
            }
            if (users[c].usuario == user) {
                users[c].bloqueio = true
                localStorage.setItem('users', JSON.stringify(users))
            }
        }
        location.href = './login.html'
    } else {
        erros++
        return
    }

}

function depositar() {
    var valor = document.getElementById('valor').value;
    if (senha == usuario_atual.senha && valor > 0) {
        var saldo_inicial = usuario_atual.saldo;
        usuario_atual.saldo = Number(usuario_atual.saldo) + Number(valor)
        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].saldo = usuario_atual.saldo
                localStorage.setItem('users', JSON.stringify(users))
            }
        }
        extrato.push(
            {
                usuario: usuario_atual.usuario,
                de_onde: "Eu",
                metodo: "Deposito",
                only: false,
                para: "Eu",
                quantia: valor,
                saldo_inicial: saldo_inicial
            })
        document.getElementById('erro').style.color = 'green'
        document.getElementById('erro').innerText = 'Deposito realizado com SUCESSO'
        localStorage.setItem('extrato', JSON.stringify(extrato))
        valor = ""
    } else {
        bloqueioForca()
        document.getElementById('erro').innerText = 'Deposito não realizado, verifique sua senha ou valor escolhido'
    }
}

function saque() {
    var valor = document.getElementById('valor').value;
    if (senha == usuario_atual.senha && valor > 0 && Number(usuario_atual.saldo) - Number(valor) > 0) {
        var saldo_inicial = usuario_atual.saldo;
        usuario_atual.saldo = Number(usuario_atual.saldo) - Number(valor)
        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].saldo = usuario_atual.saldo
                localStorage.setItem('users', JSON.stringify(users))
            }
        }
        extrato.push(
            {
                usuario: usuario_atual.usuario,
                de_onde: "Eu",
                metodo: "Saque",
                only: false,
                para: "Fora",
                quantia: valor,
                saldo_inicial: saldo_inicial
            })
        document.getElementById('erro').style.color = 'green'
        document.getElementById('erro').innerText = 'Saque realizado com SUCESSO'
        localStorage.setItem('extrato', JSON.stringify(extrato))
        valor = ""
    } else {
        bloqueioForca()
        document.getElementById('erro').innerText = 'Saque não realizado, verifique sua senha ou saldo'
    }
}

function transferir() {
    var valor = document.getElementById('valor').value;
    var numero = document.getElementById('numero').value;
    var saldo_inicial = usuario_atual.saldo;
    var desconto = () => {
        var ano = Date().split(' ')[3]
        var idade = usuario_atual.data_de_nascimento.split('-')[0];
        idade = Number(ano) - Number(idade)
        return (idade >= 60)
    };
    var result;
    for (let c = 0; c < users.length; c++) {
        if (users[c].usuario == numero) {
            result = true;
            break;
        }
    }
    if (desconto() == false) {
        desconto = 0.05
    } else if (desconto() == true) {
        desconto = 1
    }
    
    if (senha == usuario_atual.senha && valor > 0 && result == true && Number(usuario_atual.saldo) - (Number(valor) + Number(valor) * desconto) > 0 && numero != usuario_atual.usuario) {
        console.log(Number(usuario_atual.saldo) - (Number(valor) + Number(valor) * desconto), usuario_atual.saldo);
        usuario_atual.saldo = Number(usuario_atual.saldo) - (Number(valor) + Number(valor) * desconto)
        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].saldo = usuario_atual.saldo
                localStorage.setItem('users', JSON.stringify(users))
            }
        }
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == numero) {
                users[c].saldo = Number(users[c].saldo) + (Number(valor))
                localStorage.setItem('users', JSON.stringify(users))
                var nome = `${users[c].nome} ${users[c].sobrenome}`
            }
        }
        extrato.push(
            {
                usuario: usuario_atual.usuario,
                de_onde: `${usuario_atual.nome} ${usuario_atual.sobrenome}`,
                metodo: "Transferência Bancária",
                only: false,
                para: nome,
                quantia: valor,
                saldo_inicial: saldo_inicial
            })
        document.getElementById('erro').style.color = 'green'
        document.getElementById('erro').innerText = 'Transferência realizada com SUCESSO'
        localStorage.setItem('extrato', JSON.stringify(extrato))
        valor = ""
    } else {
        bloqueioForca()
        document.getElementById('erro').innerText = 'Transferência não realizada, verifique sua senha ou seu saldo'
    }

}

function desconto() {
    var ano = Date().split(' ')[3]
    var idade = usuario_atual.data_de_nascimento.split('-')[0];
    idade = Number(ano) - Number(idade)
    return (idade >= 60)
};

function pix() {
    var destinatario = document.getElementById('chave').value;
    var valor = document.getElementById('valor').value;
    var saldo_inicial = usuario_atual.saldo;
    var result;
    var desconto = () => {
        var ano = Date().split(' ')[3]
        var idade = usuario_atual.data_de_nascimento.split('-')[0];
        idade = Number(ano) - Number(idade)
        return (idade >= 60)
    };
    for (let c = 0; c < users.length; c++) {
        if (users[c].chave1 == destinatario || users[c].chave2 == destinatario || users[c].chave3 == destinatario) {
            result = true;
            break;
        }
    }
   if (desconto() == false) {
        desconto = 0.05
    } else if (desconto() == true) {
        desconto = 1
    }
    
    if (senha == usuario_atual.senha && valor > 0 && result == true && Number(usuario_atual.saldo) - (Number(valor) + Number(valor) * desconto) > 0) {
        usuario_atual.saldo = Number(usuario_atual.saldo) - (Number(valor) + Number(valor) * desconto)
        localStorage.setItem('usuario_atual', JSON.stringify(usuario_atual))
        for (let c = 0; c < users.length; c++) {
            if (users[c].usuario == usuario_atual.usuario) {
                users[c].saldo = usuario_atual.saldo
                localStorage.setItem('users', JSON.stringify(users))
            }
        }
        for (let c = 0; c < users.length; c++) {
            if (users[c].chave1 == destinatario || users[c].chave2 == destinatario || users[c].chave3 == destinatario) {
                users[c].saldo = Number(users[c].saldo) + Number(valor)
                localStorage.setItem('users', JSON.stringify(users))
                var nome = `${users[c].nome} ${users[c].sobrenome}`
            }
        }
        extrato.push(
            {
                usuario: usuario_atual.usuario,
                de_onde: `${usuario_atual.nome} ${usuario_atual.sobrenome}`,
                metodo: "PIX",
                para: nome,
                quantia: valor,
                saldo_inicial: saldo_inicial
            })
        document.getElementById('erro').style.color = 'green'
        document.getElementById('erro').innerText = 'PIX realizado com SUCESSO'
        localStorage.setItem('extrato', JSON.stringify(extrato))
        valor = ""
    } else {
        if(senha != usuario_atual.senha)
        document.getElementById('erro').innerText = 'PIX não realizado, verifique sua senha ou seu saldo'
    }


}

function MostrarExtrato() {
    document.getElementById('displayExtrato').innerHTML = ""
    for (let c = 0; c < extrato.length; c++) {
        if (extrato[c].usuario == usuario_atual.usuario || extrato[c].para == `${usuario_atual.nome} ${usuario_atual.sobrenome}` && extrato[c].only == false) {
            switch (extrato[c].metodo) {
                case "PIX":
                    case "Transferência Bancária":
                    document.getElementById('displayExtrato').innerHTML +=
                        `
                <div class="transferir" style="display:flex; justify-content: center; align-text:center;">
                    <p>De onde: <strong>${extrato[c].de_onde}</strong>&nbsp;&nbsp;&nbsp;Para onde: <strong>${extrato[c].para}</strong><br>Quantia: <strong>${extrato[c].quantia}</strong>&nbsp;&nbsp;&nbsp;Método: <strong>${extrato[c].metodo}</strong><br>Saldo Inicial: <strong>${extrato[c].saldo_inicial}</strong>&nbsp;&nbsp;&nbsp;Saldo Final: <strong>${usuario_atual.saldo}</strong></p>
                </div>
                `
                    break;
                case "Saque":
                    document.getElementById('displayExtrato').innerHTML +=
                        `
                <div class="sacar" style="display:flex; justify-content: center; align-text:center;">
                    <p>De onde: <strong>${extrato[c].de_onde}</strong>&nbsp;&nbsp;&nbsp;Para onde: <strong>${extrato[c].para}</strong><br>Quantia: <strong>${extrato[c].quantia}</strong>&nbsp;&nbsp;&nbsp;Método: <strong>${extrato[c].metodo}</strong><br>Saldo Inicial: <strong>${extrato[c].saldo_inicial}</strong>&nbsp;&nbsp;&nbsp;Saldo Final: <strong>${usuario_atual.saldo}</strong></p>
                </div>
                `
                    break;
                case "Deposito":
                    document.getElementById('displayExtrato').innerHTML +=
                        `
                <div class="deposito" style="display:flex; justify-content: center; align-text:center;">
                    <p>De onde: <strong>${extrato[c].de_onde}</strong>&nbsp;&nbsp;&nbsp;Para onde: <strong>${extrato[c].para}</strong><br>Quantia: <strong>${extrato[c].quantia}</strong>&nbsp;&nbsp;&nbsp;Método: <strong>${extrato[c].metodo}</strong><br>Saldo Inicial: <strong>${extrato[c].saldo_inicial}</strong>&nbsp;&nbsp;&nbsp;Saldo Final: <strong>${usuario_atual.saldo}</strong></p>
                </div>
                `
                    break;
            }
        }
    }
}