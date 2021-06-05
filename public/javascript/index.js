const links = 
[
    "https://www.cesupa.br/",
    "../public/landing-page.html",
    "../public/funcionalidades.html",
    "../public/criadores.html", 
    "../public/cadastro.html",
    "../public/login.html"
]

function redirect(index) {
    window.location.href = links[index]
}