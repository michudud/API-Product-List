import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./List";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<List />} path="/*" />
      </Routes>
    </BrowserRouter>
  );
};

const rootDiv = document.getElementById("root");
if (rootDiv) {
  createRoot(rootDiv).render(<App />);
}
