// useFetch.js
import { useEffect } from "react";

export default function useFetchWithState(url, state) {
  let data = state[0];
  const setData = state[1];

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return data;
}

