//responsável por receber uma requisição, ativar o que ele precisa fazer e devolver uma resposta

const axios = require('axios'); //importa o a biblioteca axios
const Dev = require('../models/Dev');//importa a classe Dev
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

//index, show, store, update, destroy


module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        //console.log(request.query);
        return response.json(devs);
    },

    async store (request, response) {//assíncrona
        const { github_username, techs, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({ github_username }); //variável

        if (!dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //crase permite inserção de variável na string! await espera pela resposta da chamada
        
            const { name = login, avatar_url, bio } = (apiResponse.data); //name = login substitui checagem por if se não existir name, usar o campo login da apiResponse
        
            const techsArray = parseStringAsArray(techs);//trim remove espaçamentos antes e depois de uma palavra
        
            //console.log(name, avatar_url, bio, github_username);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]//padrão do mongoDB!!!
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
            //Filtrar conexões q estão a no máximo 10km de disância
            // e que o novo dev tenha pelo menos uma das techs filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
            //console.log(sendSocketMessageTo);
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    }
};