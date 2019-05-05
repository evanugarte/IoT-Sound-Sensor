import React from "react";
var BarChart = require("react-chartjs").Bar;

export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 8,
      loaded: false
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
    let NEobj = { data: [] };
    let NWobj = { data: [] };
    let SEobj = { data: [] };
    let SWobj = { data: [] };
    this.props.data.map((data) => {
      NEobj.data.push(data.NEAvg);
      NWobj.data.push(data.NWAvg);
      SEobj.data.push(data.SEAvg);
      SWobj.data.push(data.SWAvg);
    });

    let newData = {  
      NE: NEobj.data,
      NW: NWobj.data,
      SE: SEobj.data,
      SW: SWobj.data,
    };
    this.setState({
      data: newData,
      loaded: true
    });
    setTimeout(() => {
      this.changeValue({target: {value: 8}});
    }, 1000);
  }
  
  changeValue = (e) => {
    this.currentValue = parseInt(e.target.value);
    this.setState({
      value: this.currentValue
    });
    this.NEAvg = this.state.data.NE[this.currentValue - 8];
    this.NWAvg = this.state.data.NW[this.currentValue - 8];
    this.SEAvg = this.state.data.SE[this.currentValue - 8];
    this.SWAvg = this.state.data.SW[this.currentValue - 8];
  }

  renderHeatMap = () => {
    let data =  {
      labels: ["Couch", "Store", "Member Entrance", "Member Exit"],
      datasets: [
        {
          label: "Sound Value",
          fillColor: ["#3e95cd", "#8e5ea2","#3cba9f", "#c45850"], 
          strokeColor: ["#3e95cd", "#8e5ea2","#3cba9f", "#c45850"],
          pointStrokeColor: ["#3e95cd", "#8e5ea2","#3cba9f", "#c45850"],
          pointHoverBackgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f", "#c45850"], 
          pointHoverBorderColor: ["#3e95cd", "#8e5ea2","#3cba9f", "#c45850"],
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f", "#c45850"],
          data: [this.NWAvg, this.NEAvg,this.SWAvg, this.SEAvg]
        }
      ]
    };
    let options = {
      legend: { display: false },
      title: {
        display: true,
        text: `${this.currentValue}:00 - ${this.currentValue + 1}:00`
      }
    };

    return (
      <React.Fragment>
        <h3>{this.currentValue}:00 - {this.currentValue + 1}:00</h3>
        <BarChart data={data} width="600" height="250" options={options}/>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        {this.state.loaded ? 
          <React.Fragment>
            <input 
              type="range" 
              defaultValue={8}
              min={8} 
              max={21} 
              step={1} 
              onChange={this.changeValue}
              className="slider" 
              id="myRange" />
            {this.renderHeatMap()}
          </React.Fragment>
          : ""}
      </div>
    );
  }
}
