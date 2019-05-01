import React from "react";
import { 
  Button,
  Container,
  ListGroup,
  Col,
  Row
} from "reactstrap";
import { getSoundData } from "../../firebase/SoundDataActions";
import DayChoice from "./DayChoice";
import TimeData from "./TimeData";
import DayGraph from "../Graphing/DayGraph";

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
    this.setState({
      hourlyAvg: []
    });
    
    if(index !== -1) {
      for(let i = 8; i < 22; i++) {
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
  }

  renderGraph = () => {
    return (
      <DayGraph data={this.state.hourlyAvg} />);
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
        <Container>
          <Row>
            <Col>
              {this.state.hourlyAvg.map((hour, key) => {
                return (
                  <ListGroup key={key}>
                    <TimeData
                      hour={key}
                      data={hour}
                    />
                  </ListGroup>
                );
              })}
            </Col>
            <Col>
              {this.renderGraph()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

