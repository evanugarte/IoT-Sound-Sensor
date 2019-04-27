import React from "react";
import ReactDOM from "react-dom";
import { Container, Row } from "reactstrap";
import CurrentSound from "./components/CurrentSound";
import Analytics from "./components/Analytics";
import "bootstrap/dist/css/bootstrap.min.css";


class App extends React.Component {
  render() {
    return(
      <Container>
        <Row>
          <CurrentSound />
        </Row>
        <Row>
          <Analytics />
        </Row>
      </Container>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
