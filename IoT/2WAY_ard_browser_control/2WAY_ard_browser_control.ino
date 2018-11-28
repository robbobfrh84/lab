// ***Arduino Setup***
// Pot: A6 to "center pot", facing pot, left is ground, right is 5v.
// RGB_LED: ground(g) is longest pin. |8|7|g|6|. A1=r, A2=g, A3=b

#include <SPI.h>
#include <WiFi101.h>
#include "wifi.h"

boolean startLED = false;
String text;
int ledInt = 0;

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
        analogWrite(8, text.toInt());
        ledInt++; text = "";
      } else if ((c == ',') && (ledInt = 1)) {
        analogWrite(7, text.toInt());
        ledInt++; text = "";
      } else if ((c == ']') && (ledInt = 2)) {
        analogWrite(6, text.toInt());
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
    int pot = analogRead(A6);
    request("GET","/?user=ard&p="+String(pot));
  }
 
}
