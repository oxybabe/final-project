import { useState } from "react";
import UserLogin from "./login";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Welcome to Meal App</h1>

      {/* <BrowserRouter /> */}
      {/* <Route path="/home"></Route> */}

      <UserLogin />
      <div></div>
    </>
  );
}

export default App;
