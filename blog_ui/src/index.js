import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter , Route ,Routes } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider} from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { ChakraProvider } from '@chakra-ui/react'

import rootReducer from "../src/services/reducers/rootReducer.js";
import Custom from "./pages/custom.js";
import Home from "./pages/home.js";
import Signup from "./pages/signup.js";
import PrivateRoute from "./PrivateRoute.jsx";
import Account from "./pages/account.js";
import Login from "./pages/login.js"

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom"
            element={
              <PrivateRoute>
                <Custom />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>Page not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
