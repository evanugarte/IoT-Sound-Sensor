import React from "react";
import { 
  Button,
  Container
} from "reactstrap";
import { getSoundData } from "../../firebase/SoundDataActions";
import DayChoice from "./DayChoice";
import DayInfo from "./DayInfo";

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
      selectedDayIndex: -1,
      hourlyAvg: new Array(24)
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
    this.setState({
      selectedDayIndex: e.target.id
    });
    this.renderDayInfo(e.target.id);
  }

  renderDayInfo = (index) => {
    console.log("gang");
    this.setState({
      hourlyAvg: []
    });
    
    if(index !== -1) {
      for(let i = 0; i < 24; i++) {
        getSoundData(this.addToAvg, this.state.days[index].name, i.toString());
      }
    }
  }

  addToAvg = (data, hour) => {
    let recievedData = data;
    let oldAvg = this.state.hourlyAvg;
    oldAvg[hour] = recievedData;
    this.setState({
      hourlyAvg: oldAvg
    });
    console.log(oldAvg);
  }

  getSoundValues = (arr) => {
    arr.allSound.map(el => console.log(el));
  }

  render() {
    return (
      <div>
        <Button onClick={this.handlePress}>Analytics!</Button>
        <DayChoice 
          days={this.state.days}
          handleChange={this.handleChange}
        />
        {this.state.hourlyAvg.map((hour, key) => {
          return (
            <Container key ={key}>
              <h4>{key}:00</h4>
              <p>NW Avg: {hour.NWAvg}</p>
              <p>NE Avg: {hour.NEAvg}</p>
              <p>SW Avg: {hour.SWAvg}</p>
              <p>SE Avg: {hour.SEAvg}</p>
              <h3>Total Avg: {hour.totalAvg}</h3>
            </Container>
          );
        })}
      </div>
    );
  }
}

