import GameProvider from "providers/GameProvider/GameProvider";
import Main from "components/Main/Main";

function App() {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
}

export default App;
