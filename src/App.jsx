import React from "react";
import { createRoot } from "react-dom/client";
import List from "./List";

const App = () => {
  return <List />;
};

createRoot(document.getElementById("root")).render(<App />);
