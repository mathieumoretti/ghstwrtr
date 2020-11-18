import React from "react";
import useSocket from "../hooks/useSocket";

export default function CreateView(props) {
  const data = useSocket(props.url);
  return (
    <div>
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  );
}