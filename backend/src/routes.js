const { Router } = require('express'); //importa apenas o módulo Router do Express
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// métodos HTTP para rotas: get, post, put, delete

//Tipos de Parâmetros
//Query params: acessíveis por request.query (Filtros, ordenação, paginação, ...)
//Route params: acessíveis por request.params (usados nos métodos PUT e DELETE - Especificam um item)
//Body: acessível por request.body (usado dentro do POST e do PUT, ou seja, dados para a criação ou alteração de um registro)

// testando metodo GET
routes.get('/devs', DevController.index);
routes.get('/search', SearchController.index);


// testando método DELETE
routes.delete('/users/:id', (request, response) => {
    //console.log(request.params);
    return response.json({ message: 'Hello Alaska!' });
});

//MongoDB - Banco não-relacional
//Axios - Consome APIs

// testando método POST
routes.post('/devs', DevController.store);

module.exports = routes; //Diz à aplicação que essas rotas estão disponíveis