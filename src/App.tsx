/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";

function App() {
  const [isGame, setIsGame] = useState(false);
  return <div>{isGame ? <div>222</div> : <div>123</div>} </div>;
}

export default App;
