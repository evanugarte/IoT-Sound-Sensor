/* eslint-disable react/prop-types */
import React from "react";
import { 
  Button,
  ButtonGroup
} from "reactstrap";

export default class DayChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      selectedDay: null
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  decideButtonColor = (val, stateVal) => {
    if(stateVal !== null && val === stateVal) {
      return "primary";
    } else {
      return "secondary";
    }
  }

  handleChange = (e) => {
    this.setState({
      selectedDay: e.target.value,
    });
    this.props.handleChange(e);  
  }

  render() {
    return (
      <ButtonGroup>
        {this.props.days.map((day) => {
          return (
            <Button
              key={day.index}
              color={this.decideButtonColor(day.name, this.state.selectedDay)}
              id={day.index}
              value={day.name}
              onClick={this.handleChange}>
              {day.name}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }
}
