import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.51:3333', {
    autoConnect: false,
});

function subscribeToNewDevs(susbscribeFunction){// listener para a mensagem de cadastro de novo dev. O main.js olhará para essa função
    socket.on('new-dev', susbscribeFunction);
}

function connect( latitude, longitude, techs ){
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    };

    socket.connect();
/* testando recepção da comunicação do backend
    socket.on('Message', text =>{
        console.log(text);
    })*/
}

function disconnect(){
    if (socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
};
