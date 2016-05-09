#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h>
#endif
#define PIN            12
#define NUMPIXELS      64
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

int delayval = 500; 
String inputString = "";      
const int ledPin = 13;
int led;
int r = 0;
int g = 0;
int b = 0;


void setup() {
  Serial.begin(9600);
  pinMode(ledPin,OUTPUT);
  #if defined (__AVR_ATtiny85__)
  if (F_CPU == 16000000) clock_prescale_set(clock_div_1);
  #endif
  pixels.begin();
  //pixels.setPixelColor(8, pixels.Color(0,0,100)); pixels.show();

}

void loop() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if(inChar == 'L'){ 
      led = inputString.toInt();
      inputString = "";
    }
    else if(inChar == 'R'){ 
      r = inputString.toInt();
      inputString = "";
    }
    else if(inChar == 'G'){ 
      g = inputString.toInt();
      inputString = "";
    }
    else if(inChar == 'B'){ 
      //digitalWrite(13,HIGH); delay(500); digitalWrite(13,LOW);
      //Serial.println(inputString);
      b = inputString.toInt();
      pixels.setPixelColor(led, pixels.Color(0,0,0)); pixels.show();
      pixels.setPixelColor(led, pixels.Color(r,g,b)); pixels.show();
      inputString = ""; 
    }
    else{
      inputString += inChar; 
    } 
  }
}
