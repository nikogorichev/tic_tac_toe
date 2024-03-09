/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import Menu from "components/Menu/Menu";
import GameProvider from "providers/GameProvider/GameProvider";

function App() {
  return (
    <GameProvider>
      <Menu />
    </GameProvider>
  );
}

export default App;
