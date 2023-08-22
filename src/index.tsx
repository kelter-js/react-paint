import { StrictMode } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import store from "./store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
