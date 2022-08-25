let mensagens = [];
let nome;
let user;

function login() {
    nome = prompt('Qual é seu nome?');
}

login();

function novoUsuario(){

    user = {
        name: nome
      }

    let newUser = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    newUser.catch(deuErroUm);
}
novoUsuario();

function pegarMensagens() {
    const mensagensServidor = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    mensagensServidor.then(exibirMensagens);
    mensagensServidor.catch(deuErro)

    setInterval(pegarMensagens, 3000);
    //setInterval (manterConexao, 5000);
}
pegarMensagens();

function exibirMensagens(resposta) {
    mensagens = resposta.data;

    renderizarMensagens();
}

function renderizarMensagens() {
    let listaMensagens = document.querySelector('.text-container');

    listaMensagens.innerHTML = '';

    for (let i = 0; i < mensagens.length; i++) {
        listaMensagens.innerHTML = listaMensagens.innerHTML + `
        <div class="text ${mensagens[i].type}">
        <p><span class="horario">(${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> ${mensagens[i].text}</p>
        </div>`;
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
    enviarMensagensServidor.catch(deuErroDois);
}

function manterConexao(){
   
    user = {
        name: nome
      }
    
   const newUser = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
}


function deuErroUm (erro){
alert ('usuário já existente. favor digitar novo usuário');
}

function deuErroDois(erro){
    alert ('mensagem não postada no banco de dados')
}

function deuErro(erro) {
    alert ('mensagem não existe no banco de dados')
}

// quando o usuário sai da sala, a pagina da erro 400
// quando o usuário tenta digitar uma outra mensagem da erro 400