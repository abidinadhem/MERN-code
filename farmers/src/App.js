import React from "react";
import { Provider } from "react-redux";
import { configueAppStore } from "./store/configureStore";
import Home from "./routes";
import './App.css'

function App() {
  const store = configueAppStore();

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
