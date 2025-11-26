import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Company from "./pages/Company.tsx";
import Privacy from "./pages/Privacy.tsx";
import "./styles.css";
import Price from "./pages/Price";
import Example from "./pages/Example";
import Risks from "./pages/Risks";

const basename = (() => {
  const raw = import.meta.env.BASE_URL ?? "/";
  const trimmed = raw.replace(/\/+$/, "");
  return trimmed || "/";
})();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/company" element={<Company />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/price" element={<Price />} />
        <Route path="/example" element={<Example />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
