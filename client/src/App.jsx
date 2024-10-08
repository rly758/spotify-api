import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home";
import Loading from "./Loading";
import Recommender from "./Recommender";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch("/auth/current-session")
      .then((response) => response.json())
      .then((data) => {
        setAuth(data);
      });
  }, []);

  if (auth === null) {
    return <Loading />;
  }
  if (auth) {
    return <Recommender auth={auth} />;
  }
  return <Home />;
}

export default App;
