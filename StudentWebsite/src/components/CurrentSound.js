import React from "react";
import { listenForData } from "../firebase/SoundDataActions";

export default class CurrentSound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pub: 0,
      currentReading: null,
      justLoaded: true
    };
    this.firstListen = false;
  }

  componentDidMount() {
    listenForData(this.updateStuff);
  }

  handleFirstSoundRead = (sound) => {
    let sum = 0;
    if(sound.length !== 0) {
      sound.map((item) => sum += parseFloat(item.sound));
      sum /= sound.length;
      this.setState({
        justLoaded: false
      }, () => setTimeout(() => {}, 1000));
    }
    this.updateStuff(sum);
    listenForData(this.updateStuff, false);
  }

  updateStuff = (data) => {
    this.setState({
      pub: this.state.pub + 1,
      currentReading: data.sound
    });
  }

  render() {
    const {currentReading} = this.state;
    return (
      <div>
        <p>Current Readings: { currentReading ? 
          currentReading : 
          "Please wait one minute while we fetch the most recent reading"}</p>          
        <p>Readings within the hour: {this.state.pub}</p>
      </div>
    );
  }
}

