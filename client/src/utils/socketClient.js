
import io from 'socket.io-client';

export const SocketClient = function(url)
{
    this.url = url || "";
    this.socket = io(url);
    this.on = this.on.bind(this);
}

SocketClient.prototype.on = function(eventName, callback) {    
    this.socket.on(eventName, callback);
 };

const defaultConnect = () => {  console.log('a user is connected'); };
const defaultDisconnect = () => { console.log('a user is disconnected'); };
 
export const AutoSocket = function(url)
{
    SocketClient.call(this, url);
    this.on("connect", defaultConnect);
    this.on("disconnect", defaultDisconnect);
}
AutoSocket.prototype = Object.create(SocketClient.prototype);
