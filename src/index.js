import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import ApplicationViews from "./ApplicationViews";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';


    ReactDOM.render(
      <Router>
        <ApplicationViews />
      </Router>,
      document.querySelector("#root")
    );
    
    registerServiceWorker();


