import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import "./styles/main.scss";

const root = createRoot(document.getElementById("root"));
root.render(<HashRouter><App /></HashRouter>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
