import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./states/redux/store.ts";
import { CommerceProvider as MyProvider } from "./context/context.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MyProvider>
      <App />
    </MyProvider>
  </Provider>
);
