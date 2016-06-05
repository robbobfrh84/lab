#include <WiFi101.h>

//vvvvvvvvvv- Wifi declarations -vvvvvvvvvv//
const char* ssid = "2WIRE648";
const char* password = "3519464889";
int status = WL_IDLE_STATUS;
WiFiClient client;

//vvvvvvvvvv- PubNub declarations and variables -vvvvvvvvvv//
const char server[] = "pubsub.pubnub.com";

//vvvvvvvvvv- Project variables -vvvvvvvvvv//
int light = A0;    
int led = 5; 
int delayTime = 90000;

void setup() {
  Serial.begin(9600); 
  delay(10);
  pinMode(light, INPUT);
  //pinMode(led, OUTPUT);

  while (status != WL_CONNECTED) { // Connect to WiFi network
    Serial.print("Attempting to connect to SSID: "); 
    Serial.println(ssid); 
    status = WiFi.begin(ssid, password);  
    delay(10000); 
  } 
  printWifiStatus();
}
//----------------------------------------------------------------//
//----------                 VOID LOOP                  ----------//
//----------------------------------------------------------------//
void loop() {
  int lightData = analogRead(light);
  int ledValue = (1024-lightData)/4;
//  Serial.println();
//  Serial.print("Sensor read Value: ");Serial.println(lightData);
//  Serial.print("-Set LED value to: ");Serial.println(ledValue);
//  analogWrite(led,ledValue);
  String l = String(lightData);
  String d = String(ledValue);
  client.stop(); 
  if (client.connect(server, 80)) {
    client.println("GET /publish/pub-c-d9caecb5-0430-44ca-b3bc-c40e492ef8b4/sub-c-0a33ef98-1ef7-11e6-84f2-02ee2ddab7fe/0/test/0/%7B%22light%22%3A"+l+"%2C%22led%22%3A"+d+"%7D HTTP/1.1");
    client.println("Host: pubsub.pubnub.com");
    client.println("User-Agent: ArduinoWiFi/1.1");
    client.println("Connection: close");
    client.println(); 
  } else {
    Serial.println("connection failed");
  }
  delay(delayTime);
}

void printWifiStatus() { 
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: "); 
  Serial.println(ip);
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi); 
  Serial.println(" dBm");
}
