/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";
import Menu from "components/Menu/Menu";

function App() {
  const [isGame, setIsGame] = useState(false);
  return <div>{isGame ? <div>222</div> : <Menu/>} </div>;
}

export default App;
