import { useState, useEffect } from "react";

const useLocalStorage = (key, value = null) => {
    // const [state, setState] = useState(() => {
    //     const localStorageValue = localStorage.getItem(key);
    //     if (localStorageValue) {
    //       return JSON.parse(localStorageValue);
    //     }
    //     return defaultValue;
    //   });
    
//       useEffect(() => {
//         localStorage.setItem(key, JSON.stringify(state));
//       }, [key, state]);
    
//       const update = (newValue) => {
//         setState(newValue);
//       };
    
//       const remove = () => {
//         setState(defaultValue);
//         localStorage.removeItem(key);
//       };
    
//       return [state, update, remove];
// }
// export default useLocalStorage;

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
