const express = require('express');

//importando mongoose que permite acesso ao MongoDB
const mongoose = require('mongoose');

//importando o CORS
const cors = require('cors');

//importando http para que aplicação ouça requisições do protocolo websocket
const http = require('http');

//importando arquivo de rotas
const routes = require('./routes');

//importando a função de setup do websocket
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app); //Extraindo o servidor e aplicando nosso app como atributo

setupWebsocket(server);//instanciando a função passando nosso servidor como parâmetro

mongoose.connect('mongodb+srv://user:password@cluster0-jjbgz.mongodb.net/week10?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// o comportamento padrão do NodeJS é evitar acessos externos à API. É preciso ajustar as permissões para isso.
// isso é feito adicionando a extensão CORS (Cross Origin Resource Sharing)

app.use(cors(/*{ origin: 'http://localhost:3000'}*/));//sem nada dentro de cors(), ele libera o acesso externo a TODO TIPO DE APLICAÇÃO!

//falando para a aplicação usar o JSON (senão ela nao entende o corpo da requisição em JSON)
app.use(express.json());//sempre antes das rotas!!

app.use(routes); //liga as rotas ao app



server.listen(3333); //trocado de app.listen para que usemos nosso servidor fora do Express
