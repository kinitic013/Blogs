import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "../src/services/reducers/rootReducer.js";
import Custom from "./pages/custom.js";
import Login from "./pages/account.js";
import App from "./components/App.jsx";

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
const Route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/custom",
    element: <Custom />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={Route} />
  </Provider>
);
