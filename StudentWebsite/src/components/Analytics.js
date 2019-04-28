import React from "react";
import { Button } from "reactstrap";
import { getSoundData } from "../firebase/SoundDataActions";

export default class Analytics extends React.Component {


  constructor(props) {
    super(props);
    this.state = { };
  }

  handlePress = () => {
    getSoundData();
    console.log("GO");
  }

  render() {
    return (
      <div>
        <Button onClick={this.handlePress}>Analytics!</Button>
      </div>
    );
  }
}

