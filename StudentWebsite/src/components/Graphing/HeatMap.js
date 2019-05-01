import React from "react";
import { Row, Col } from "reactstrap";

export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 8
    };
    this.NEAvg = null;
    this.NWAvg = null;
    this.SEAvg = null;
    this.SWAvg = null;
    this.currentValue = 8;
    this.oldProps = null;
  }

  componentDidUpdate() {
    if(this.oldProps !== this.props) {
      this.populateData();
    }
    this.oldProps = this.props;
  }

  populateData = () => {
    console.log(this.props);
    
    let NEobj = { data: [] };
    let NWobj = { data: [] };
    let SEobj = { data: [] };
    let SWobj = { data: [] };
    this.props.data.map((data) => {
      console.log(data);
      NEobj.data.push(data.NEAvg);
      NWobj.data.push(data.NWAvg);
      SEobj.data.push(data.SEAvg);
      SWobj.data.push(data.SWAvg);
    });

    let newData = {  };
    newData.NE = NEobj.data;
    newData.NW = NWobj.data;
    newData.SE = SEobj.data;
    newData.SW = SWobj.data;
    this.setState({
      data: newData
    });
    console.log(newData);
    console.log("populaed");
  }
  
  changeValue = (e) => {
    this.currentValue = parseInt(e.target.value);
    // console.log(this.state);
    this.setState({
      value: this.currentValue
    });
    this.NEAvg = this.state.data.NE[this.currentValue - 8];
    this.NWAvg = this.state.data.NW[this.currentValue - 8];
    this.SEAvg = this.state.data.SE[this.currentValue - 8];
    this.SWAvg = this.state.data.SW[this.currentValue - 8];    
  }

  renderHeatMap = () => {
    const values = [
      { name: "Couch", value: this.NWAvg},
      { name: "Store", value: this.NEAvg},
      { name: "Member Entrance", value: this.SWAvg},
      { name: "Member Exit", value: this.SEAvg},
    ];
    return (
      <React.Fragment>
        <h3>{this.currentValue}:00 - {this.currentValue + 1}:00</h3>
        <Row>
          <Col style={{color: `rgb(239, 37, ${255 - this.NWAvg})`}}>
            Couch: {this.NWAvg}
          </Col>
          <Col style={{color: `rgb(239, 37, ${255 - this.NEAvg})`}}>
            Store: {this.NEAvg}
          </Col>
        </Row>
        <Row>
          <Col style={{color: `rgb(239, 37, ${255 - this.SWAvg})`}}>
            Member Entrance: {this.SWAvg}
          </Col>
          <Col style={{color: `rgb(239, 37, ${255 - this.SEAvg})`}}>
            Member Exit: {this.SEAvg}
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <input 
          type="range" 
          min={8} 
          max={21} 
          step={1} 
          onChange={this.changeValue}
          className="slider" 
          id="myRange" />
        <React.Fragment>
          {this.renderHeatMap()}
        </React.Fragment>

      </div>
    );
  }
}
