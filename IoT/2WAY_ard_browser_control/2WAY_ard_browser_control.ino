// ***Arduino Setup***
// Pot: A6 to "center pot", facing pot: left is ground, right is 5v.
// RGB_LED: ground(g) is longest pin. |A0|A1|g|A4|. A2&A3 are input only on huzzah32

#include <SPI.h>
#include <WiFi101.h> // YO! Look! > This worked with mkr1000
// #include <ESP8266WiFi.h> // & YO! Look! > This worked with esp8622 (nodeMCU)
#include "wifi.h"

boolean startLED = false;
String text;
const int analogInPin = A0;
int ledInt = 0;
int r = 6;
int g = 7;
int b = 8;


void setup() {
  Serial.begin(9600);
  start();
  request("GET","/");
}

void loop() {

  while (client.available()) {
    char c = client.read();
    Serial.write(c);
    if (startLED == true) {
      if ((c == ',') && (ledInt == 0)) {
        analogWrite(r, text.toInt());
        ledInt++; text = "";
      } else if ((c == ',') && (ledInt = 1)) {
        analogWrite(g, text.toInt());
        ledInt++; text = "";
      } else if ((c == ']') && (ledInt = 2)) {
        analogWrite(b, text.toInt());
        ledInt = 0; text = ""; startLED = false;
        client.flush();
      } else {
        text += c;  
      }
    }
    if (c == '[') { 
      startLED = true; 
    }
  }

  if (!client.connected()) {
    client.stop();
    delay(1);
    int pot = analogRead(analogInPin);
    request("GET","/?user=ard&p="+String(pot));
  }
 
}
