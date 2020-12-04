// useFetch.js
import { useState, useEffect } from "react";

export function useFetch(url, initValue, cb) {
  const [data, setData] = useState(initValue || {});

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => cb(data));
  }, []);

  return data;
}

export function useFetchWithoutState(url, cb) {
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => cb(data));
  }, []);
}