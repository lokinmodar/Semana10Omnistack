//responsável por receber uma requisição, ativar o que ele precisa fazer e devolver uma resposta

const axios = require('axios'); //importa o a biblioteca axios
const Dev = require('../models/Dev');//importa a classe Dev
const parseStringAsArray = require('../utils/parseStringAsArray');

//para pesquisa por dev e localização


module.exports = {

    async index(request, response) {
        //buscar todos os devs num raio de 10 km e filtrar por tecnologias
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        //const devs = await Dev.find();
        //console.log(techsArray);
        return response.json({ devs });
    }


}