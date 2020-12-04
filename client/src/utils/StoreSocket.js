import { AutoSocket } from "./socketClient";

export const StoreSocket = function(url)
{
    AutoSocket.call(this, url);
}
StoreSocket.prototype = Object.create(AutoSocket.prototype);
