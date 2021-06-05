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

const links = 
[
    "https://www.cesupa.br/",
    "../public/landing-page.html",
    "../public/funcionalidades.html",
    "../public/criadores.html", 
    "../public/cadastro.html",
    "../public/login.html",
    "../public/minha-conta.html"
]

function redirect(index) {
    localStorage.setItem('users', JSON.stringify(users))
    window.location.href = links[index]
}
