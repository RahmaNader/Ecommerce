import { Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@components/atoms";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1 className="text-3xl font-bold text-blue-500">Vite + React</h1>
        <Button label={"aDASD"} type="primary" />
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default App;
