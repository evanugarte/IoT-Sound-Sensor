import React from "react";
import { ListGroupItem } from "reactstrap";

export default class TimeData extends React.Component {
  render() {
    const { data, hour } = this.props;
    return (
      <ListGroupItem>
        <h4>{hour}:00</h4>
        <p>NW Avg: {data.NWAvg}</p>
        <p>NE Avg: {data.NEAvg}</p>
        <p>SW Avg: {data.SWAvg}</p>
        <p>SE Avg: {data.SEAvg}</p>
        <h3>Total Avg: {data.totalAvg}</h3>
      </ListGroupItem>
    );
  }
}
