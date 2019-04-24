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

unsigned long lastMillis = 0;

void loop() {
    mqttClient->loop();
    delay(1);  // <- fixes some issues with WiFi stability

  if (!mqttClient->connected()) {
    connect();
  }

  // TODO: replace with your code
  // publish a message roughly every second.
  if (millis() - lastMillis > 60000) {
    lastMillis = millis();

    int val = analogRead(A0);

    String payload = String("sound: ") + val;
    Serial.println(payload + "\n");
    //publishTelemetry(mqttClient, "/sensors", getDefaultSensor());
    publishTelemetry(payload);
  }
}
