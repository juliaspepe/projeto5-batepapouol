let mensagens = [];
let nome;
let user;
let sairPaginaLogin;
let barraSuperior;
let barraInferior;
let texto;

function login() {
    nome = document.querySelector('.user').value;
    user = {
        name: nome
    }
}

function entrar() {
   login();
   
   let tirarInput = document.querySelector('.input-entrada');
   tirarInput.classList.add('hidden');

   let tirarBotao = document.querySelector('.entrar').classList.add('hidden');
   console.log(tirarBotao);

   let adicionarLoader = document.querySelector('.loader').classList.remove('hidden');

   setTimeout(novoUsuario, 2000);
}

function deuCerto(){
    sairPaginaLogin = document.querySelector('.entrada');
    sairPaginaLogin.classList.add('hidden');

    barraSuperior = document.querySelector('header');
    barraSuperior.classList.remove('hidden');

    texto = document.querySelector('.text-container');
    texto.classList.remove('hidden');

    barraInferior = document.querySelector('footer');
    barraInferior.classList.remove('hidden');
}

function novoUsuario() {
    let newUser = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    newUser.then(deuCerto);
    newUser.catch(deuErroUm);
}

function pegarMensagens() {
    const mensagensServidor = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    mensagensServidor.then(exibirMensagens);
    mensagensServidor.catch(deuErro)
}

function exibirMensagens(resposta) {
    mensagens = resposta.data;

    renderizarMensagens();
}

function renderizarMensagens() {
    let listaMensagens = document.querySelector('.text-container');

    listaMensagens.innerHTML = '';

    for (let i = 0; i < mensagens.length; i++) {

        if (mensagens[i].type === 'message'){
        listaMensagens.innerHTML = listaMensagens.innerHTML + `
        <div class="text ${mensagens[i].type}">
        <p><span class="horario">(${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}</p>
        </div>`;
        }

        if (mensagens[i].type === 'status'){
            listaMensagens.innerHTML = listaMensagens.innerHTML + `
            <div class="text ${mensagens[i].type}">
            <p><span class="horario">(${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> ${mensagens[i].text}</p>
            </div>`;
            }
    }

    let ultimaMensagem = listaMensagens.lastChild;
    ultimaMensagem.scrollIntoView();
}

function enviarMensagens() {

    let elementNome = nome;
    let elementMensagem = document.querySelector('.texttype').value;
    let elementDestino = "Todos";
    let elementTipo = "message";

    console.log(elementMensagem);
    const novaMensagem = {

        from: elementNome,
        to: elementDestino,
        text: elementMensagem,
        type: elementTipo

    }

    const enviarMensagensServidor = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMensagem);
    enviarMensagensServidor.then(pegarMensagens);

    const zerarMensagem = document.querySelector(".texttype");
    zerarMensagem.value = "";
}

setInterval(pegarMensagens, 3000);

function manterConexao() {

    user = {
        name: nome
    }

    const newUser = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
    newUser.catch(login);
}

setInterval(manterConexao, 5000);

function deuErroUm(erro) {
    alert('esse usuário já existe. favor digitar um novo nome');
    window.location.reload();
}

function deuErro(erro) {
    alert('usuário deslogado. favor refazer o login');
    window.location.reload()
}

document.addEventListener("keypress", function(enviarMensagens) {
    if(enviarMensagens.key === 'Enter') {
    
        var btn = document.querySelector("#enviodeMensagem");
      
      btn.click();
    
    }
  });

