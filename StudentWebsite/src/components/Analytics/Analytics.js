import React from "react";
import { 
  Button, 
  ButtonDropdown, 
  DropdownToggle, 
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import { getSoundData } from "../../firebase/SoundDataActions";

export default class Analytics extends React.Component {


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
      selectedDay: "",
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
    console.log(e);
    this.setState({
      selectedDay: e.target.value,
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
      </div>
    );
  }
}

