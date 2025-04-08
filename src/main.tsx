import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./states/redux/store.ts";
import { CommerceProvider as MyProvider } from "./context/context.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyProvider>
    </PersistGate>
  </Provider>
);
