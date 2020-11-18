// useSocket.js
import { useState, useEffect } from "react";

import {AutoSocket} from "../utils/socketClient";

export function useAutoSocket(socket) {
    console.log(socket);
    useEffect(() => {     
        //CLEAN UP THE EFFECT
        return () => socket.disconnect();
     }, [`yo`]);
  }

export function useSocket(url) {
  const [data, setData] = useState([]);

  var socket = new AutoSocket(url);
  useAutoSocket(socket);
  return data;
}

