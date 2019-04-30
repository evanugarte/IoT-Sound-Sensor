/******************************************************************************
   Copyright 2018 Google
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 *****************************************************************************/
#include "esp32_mqtt.h"

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  setupCloudIoT();
}

/**
 * The global variables correspond to: 
 * start: the start time that sound was read,
 * sound_avg: the average reading of the sound overtime,
 * count: the number of times sound was read before publishing a message
 */
unsigned long start = 0;
double sound_avg = 0;
int count = 0;

void loop() {
    mqttClient->loop();
    delay(1);  // <- fixes some issues with WiFi stability

  if (!mqttClient->connected()) {
    connect();
  }

  /* With Each loop, add the reading to the average and increment count*/
  sound_avg += (double)analogRead(A0);
  count++;
  
  /**
   * This if statement checks if a minute has elasped, and if the condition
   * is true, we send a message to the Google PubSub topic.
   */
  if (millis() - start > 60000) {
    /* Update the start value to the current time */
    start = millis();

    /* divide the total sound reading by the average */
    sound_avg /= (double)count;
    
    /**
     * This is where we format the message, the location 
     * corresponds to a corner in the room ("NE", "NW", "SE", "SW")
    */
    String location = "NE";
    String payload = location + ":" + String(sound_avg);

    // Uncomment the lines below for debugging
    // Serial.println("Time's up! The average was: " + payload + "\n");
    // Serial.println(String(count));

    /* Reset the count and sound_avg to 0 */ 
    count = 0;
    sound_avg = 0;
    /* publish the message to GCP. */
    publishTelemetry(payload);
  }
}
