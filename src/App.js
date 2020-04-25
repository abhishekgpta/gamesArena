import React from "react";
import "./styles.css";
import GamesArena from "./components";
export default function App() {
  return (
    <div className="App">
      <h1>Sapient Games Arena</h1>
      <h4>Listing the games developed for different platforms</h4>
      <GamesArena />
    </div>
  );
}
