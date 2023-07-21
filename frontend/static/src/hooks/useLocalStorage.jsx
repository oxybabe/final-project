import { useState, useEffect } from "react";

const useLocalStorage = (key, value = null) => {
  const [state, setState] = useState(value);
  const localStorageValue = localStorage.getItem(key);

  useEffect(() => {
    if (localStorageValue) {
      setState(JSON.parse(localStorageValue));
    } else {
      localStorage.setItem(key, JSON.stringify(value), "id", "username");
    }
  }, []);

  const update = (to) => {
    setState(to);
    localStorage.setItem(key, JSON.stringify(to), "id", "username");
  };
  const get = (to) => {
    setState(to);
    localStorage.getItem(key, JSON.stringify(value), "id", "username");
  };

  const remove = () => {
    setState(null);
    localStorage.removeItem(key);
  };

  return [state, update, remove];
};
export default useLocalStorage;
