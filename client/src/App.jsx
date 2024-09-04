import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./Home";
import Loading from "./Loading";
import Recommender from "./Recommender";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get("/auth/current-session").then(({ data }) => {
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
