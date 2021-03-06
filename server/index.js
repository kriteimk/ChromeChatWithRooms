//var httpServer = require('http').createServer();
//var io = require('socket.io')(httpServer);
var fs = require( 'fs' );
var app = require('express')();
var https = require('https');
var server = https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
},app);

var io = require('socket.io').listen(server);

const RTCMultiConnectionServer = require('rtcmulticonnection-server');

var mongo = require('./mongodb.js');
var chat = require('./chat.js');
var user = require('./user.js');


/**
 * The SocketIO methods used for the communication with the client.
 */
io.on('connection', (socket) => {
    /**
     * Generates an id to a new user.
     */
	 
	console.log("1");
	RTCMultiConnectionServer.addSocket(socket);
	 
    socket.on('generateUserId', (callback) => {
        user.generateUserId(callback);
    });

    /**
     * Changes the name of a user.
     */
    socket.on('changeUserName', (data) => {
        user.changeUserName(socket, data.room, data.userId, data.userName);
    });

    /**
     * Inserts a user into a room.
     */
    /*socket.on('joinRoom', (room) => {
        chat.joinRoom(socket, room);*/
	socket.on('joinRoom', (roomJoined, room) => {
        chat.joinRoom(socket, roomJoined, room);
    });

    /**
     * Notifies that someone is typing.
     */
    socket.on('typing', (data) => {
        chat.notifyIsTyping(socket, data.room, data.user);
    });

    /**
     * Notifies that someone stopped typing.
     */
    socket.on('stoppedTyping', (data) => {
        chat.notifyStoppedTyping(socket, data.room, data.user);
    });

    /**
     * Broadcasts a user's message to the other users in the same room.
     */
    socket.on('chatMessage', (data) => {
        chat.receiveChatMessage(socket, data.room, data.message, data.senderId, data.senderName);
    });

    /**
     * Loads older messages from the database and sends it back to the
     * socket that requested it.
     */
    socket.on('loadOlderMessages', (data) => {
        chat.getLastMessages(socket, data.room, data.oldestMessageTimestamp);
    });

    /**
     * Updates the user counter for other users when someone disconnects
     */
    socket.on('disconnecting', () => {
        chat.removeUserFromRoomCounter(socket);
    });
});

/**
 * Connects to the MongoDB and, if no error occurred, starts the server.
 */
mongo.init((err) => {
    if (err) {
        throw err;
    }

    //httpServer.listen(3000, () => console.log('url-chat running on port ' + 3000))
	server.listen(3000, () => console.log('url-chat running on port ' + 3000))
});