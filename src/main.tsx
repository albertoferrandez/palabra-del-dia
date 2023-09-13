import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { WordProvider } from "./context/wordContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WordProvider>
      <App />
    </WordProvider>
  </React.StrictMode>
);
