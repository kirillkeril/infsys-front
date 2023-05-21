import logo from './logo.svg';
import './App.css';
import {ConnectButton} from "./components/ConnectButton";
import {CloseButton} from "./components/CloseButton";
import {PingButton} from "./components/PingButton";
import {Board} from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <ConnectButton/>
      <CloseButton/>
      <Board/>
    </div>
  );
}

export default App;
