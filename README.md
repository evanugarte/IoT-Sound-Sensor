# SmartNoiseSense
Using ESP32s, sound sensors and Google Cloud Platform, this project tracks the noise levels of the Software and Computer Engineering Society's club room.

## Project Folder Description
The project is split into three folders, `GoogleCloud` `SoundRead` and `StudentWebsite`.
- GoogleCloud: Contains the code for the functions that are executed in the cloud to handle published messages.
- SoundRead: Holds all of the code that is flashed onto the ESP32 to read noise and publish the data to a Google PubSub topic.
- StudentWebsite: Holds all of the website code, written using React.js, to read the room's current noise level and past readings.

### Technologies Used
**Cloud**

[Google Cloud Platform](https://cloud.google.com/)

[Google IoT Core](https://cloud.google.com/iot-core/)

[Google Cloud IoT Arduino Library](https://github.com/GoogleCloudPlatform/google-cloud-iot-arduino)

[Firebase](https://firebase.google.com)

[OpenSSL Elliptic Curve Cryptography](https://wiki.openssl.org/index.php/Elliptic_Curve_Cryptography)

**Hardware**

[ESP32 Microcontroller](https://www.amazon.com/HiLetgo-ESP-WROOM-32-Development-Microcontroller-Integrated/dp/B0718T232Z)

[Sparkfun Sound Sensor](https://www.sparkfun.com/products/12642)

[Arduino IDE](https://www.arduino.cc/en/Main/Software)

**Website**

[React.js](https://reactjs.org/)

[Chart.js](https://www.chartjs.org/)

### Special Thanks

[Software and Computer Engineering Society (SCE)](http://sce.engr.sjsu.edu)

[Khalil Estell](https://github.com/kammce)

[Pranav Patil](https://github.com/pranavpatilsce)

You, the reader
