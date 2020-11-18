import React, { useEffect, useState } from "react";

import { useSocket } from "../hooks/useSocket";

// Use the this to factorize!!

const defaultRenderer = () => {   return <h5>Default Renderer</h5>; };

export function SocketIO(props) {
  var data = useSocket(props.url);
  console.log('data');
  console.log(data);
  // return;
  return props.render(data) || defaultRenderer();
}