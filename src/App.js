// import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/styles.scss";

// import Footer from "./components/layouts/Footer";

import Home from "./components/pages/Home";

import ScrollToTop from "./components/utils/ScrollToTop";
// import Navbar from "./components/layouts/Navbar";


function App() {

  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
