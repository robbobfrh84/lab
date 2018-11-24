#include <SPI.h>
#include <WiFi101.h>
#include "wifi.h"

int cnt = 0;

void setup() {
  Serial.begin(9600);
  start();
  request("GET","/");
}

void loop() {

  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting from server.");
    client.stop();
    
    delay(1000);
    request("GET","/?c="+String(cnt));
    cnt++;

    //while (true);
  }
 
}
