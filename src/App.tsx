import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <p className="text-base font-semibold text-foreground">{count}</p>
      <Button onClick={onClick}>lsdhjfkjadhf</Button>
    </>
  );
}

export default App;
