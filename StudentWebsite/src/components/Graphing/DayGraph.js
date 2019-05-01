import React from "react";
var LineChart = require("react-chartjs").Line;

export default class DayGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [8, 9, 10, 11, 12, 13, 14,
          15, 16, 17, 18, 19, 20, 21,],
        datasets: []
      },
      options: {
        title: {
          display: true,
          text: "Daily Average"
        }
      }
    };
    this.oldProps = null;
  }

  componentDidUpdate() {
    if(this.oldProps !== this.props) {
      this.renderDataAndOptions();
    }
    this.oldProps = this.props;
  }

  getSoundObj = (label, color) => {
    return { 
      data: [], 
      label: label, 
      fillColor: color, 
      strokeColor: color,
      pointStrokeColor: color, 
      fill: false 
    };
  }

  renderDataAndOptions = () => {
    let NEobj = this.getSoundObj("Storeside", "#adffbb");
    let NWobj = this.getSoundObj("Couch", "#ffd6d6");
    let SEobj = this.getSoundObj("Entrance", "#d6e7ff");
    let SWobj = this.getSoundObj("Member Entrance", "#dcd6ff" );
    let totalObj = this.getSoundObj("Total Average", "#e00000");
    this.props.data.map((data) => {
      NEobj.data.push(data.NEAvg);
      NWobj.data.push(data.NWAvg);
      SEobj.data.push(data.SEAvg);
      SWobj.data.push(data.SWAvg);
      totalObj.data.push(data.totalAvg);
    });

    let oldData = {
      labels: this.state.data.labels,
      datasets: []
    };
    oldData.datasets.push(NEobj);
    oldData.datasets.push(NWobj);
    oldData.datasets.push(SEobj);
    oldData.datasets.push(SWobj);
    oldData.datasets.push(totalObj);
    this.setState({
      data: oldData
    });
  }

  render() {
    return (
      <LineChart data={this.state.data}
        width="600" height="250"
        options={this.state.options} redraw />
    );
  }
}
