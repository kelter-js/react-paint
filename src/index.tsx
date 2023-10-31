import { StrictMode } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import { CanvasProvider } from "./CanvasContext";
import store from "./store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <CanvasProvider>
        <App />
      </CanvasProvider>
    </Provider>
  </StrictMode>
);
