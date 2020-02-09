import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Messages from "./containers/Messages/Messages";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Toolbar/>
        </header>
        <Container style={{marginTop: '20px'}}>
          <Switch>
            <Route path="/" exact component={Messages} />
          </Switch>
        </Container>
      </Fragment>
    );
  }
}

export default App;
