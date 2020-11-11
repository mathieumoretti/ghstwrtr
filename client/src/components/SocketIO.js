import React, { useEffect, useState } from "react";

import io from 'socket.io-client';

export default function SocketIO() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    console.log( "Use effect")
    var socket = io();
    socket.on('connect', function(){  console.log('a user is connected'); });
    socket.on('event', data => {
      setResponse(data);
    });
    socket.on('disconnect', function(){ console.log('a user is disconnected'); });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}