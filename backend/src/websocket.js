//contém métodos para gerenciamento das requisições ao websocket
const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = []; //como é teste, estamos salvando só numa variável, mas o interessante em produção é salvar no BD

exports.setupWebsocket = (server) => {
    //console.log('Woo!');
    io = socketio(server);

    io.on('connection', socket => {//Listener para o socket
        const { latitude, longitude, techs } = socket.handshake.query;
        //console.log(socket.id);//toda vez que alguém conectar ao socket, ele emite um aviso
        //console.log(socket.handshake.query);//onde estão os parâmetros enviados pelo cliente
/* testando envio de mensagem ao frontend de forma automática
        setTimeout(() => {
            socket.emit('Message', "Hello Cacotinha!")

        }, 3000);*/
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = ( coordinates, techs ) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item));
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);

    })
}