import React from "react";
import { 
  Button
} from "reactstrap";
import { getSoundData } from "../../firebase/SoundDataActions";
import DayChoice from "./DayChoice";

export default class Analytics extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      selectedDayIndex: -1
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handlePress = () => {
    getSoundData(this.getSoundValues);
  }

  handleChange = (e) => {
    console.log(e.target.id);
    this.setState({
      index: e.target.id
    });   
  }

  getSoundValues = (arr) => {
    arr.map(el => console.log(el));
  }

  render() {
    return (
      <div>
        <Button onClick={this.handlePress}>Analytics!</Button>
        <DayChoice 
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

