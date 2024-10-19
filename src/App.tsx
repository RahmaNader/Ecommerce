import { Link } from "react-router-dom";
import { Button } from "@components/atoms";
import './App.css'
import Cart from "@components/Cart/Cart";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Cart/>
        <Button label={"Checkout"} type="primary" size="small" />
        <Button label={"Checkout"} type="primary" size="medium" />
        <Button label={"Checkout"} type="primary" size="large" />
        <Button label={"Checkout"} type="secondary" size="small" />
        <Button label={"Checkout"} type="secondary" size="medium" />
        <Button label={"Checkout"} type="secondary" size="large" />
        <Button label={"Checkout"} type="outlined" size="small" />
        <Button label={"Checkout"} type="outlined" size="medium" />
        <Button label={"Checkout"} type="outlined" size="large" />
        {/* <Link to="/">Home</Link> */}
      </div>
    </div>
  );
}

export default App;
