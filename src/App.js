import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import OrderForm from "./components/OrderForm";
import Confirm from "./components/Confirm";

const App = () => {
  return (
    //App.js Router path ayarlamaları
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/orderform">
          <OrderForm />
        </Route>

        <Route path="/confirm">
          <Confirm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default App;
