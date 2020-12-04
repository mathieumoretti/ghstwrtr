import React from "react";
import useFetch from "../hooks/useFetch";

export default function DataLoader(props) {
  const data = useFetch(props.url);
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