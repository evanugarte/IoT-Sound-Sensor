/* eslint-disable react/prop-types */
import React from "react";
import { 
  ButtonDropdown, 
  DropdownToggle, 
  DropdownItem,
  DropdownMenu
} from "reactstrap";

export default class DayChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      days: [
        {index: 0, name: "Sunday"},
        {index: 1, name: "Monday"},
        {index: 2, name: "Tuesday"},
        {index: 3, name: "Wednesday"},
        {index: 4, name: "Thursday"},
        {index: 5, name: "Friday"},
        {index: 6, name: "Saturday"}
      ],
      selectedDay: ""
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  handleChange = (e) => {
    this.setState({
      selectedDay: e.target.value,
    });
    this.props.handleChange(e);  
  }

  render() {
    return (
      <ButtonDropdown 
        isOpen={this.state.dropdownOpen} 
        toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.selectedDay === "" ? "Select Day..." : this.state.selectedDay}
        </DropdownToggle>
        <DropdownMenu>
          {this.state.days.map((day) => {
            return (
              <DropdownItem
                key={day.index}
                id={day.index}
                value={day.name}
                onClick={this.handleChange}>
                {day.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
