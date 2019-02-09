import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Chatterbox from "./Chatterbox";

const App = (props) => (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/sign-up" component={ Signup } />
      <Route exact path="/chatterbox" component={ Chatterbox } />
    </Switch>
);

export default App;
