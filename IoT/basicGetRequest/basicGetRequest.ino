#include <SPI.h>
#include <WiFi101.h>

char ssid[] = "ATT6R6j6Y8";      // your network SSID (name)
char pass[] = "22572+5w7b7z";   // your network password
int keyIndex = 0;                 // your network key Index number (needed only for WEP)

int status = WL_IDLE_STATUS;
WiFiServer server(80);

char callback[20] = "arduinoWifiCallback";

int Apin = A5;
int led = 6;

void setup() { 
  Serial.begin(115200);
  pinMode(led, OUTPUT);
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: "); Serial.println(ssid);
    status = WiFi.begin(ssid, pass); delay(10000);
  }
  server.begin();
  printWifiStatus();
  digitalWrite(led, HIGH);
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    Serial.println("new client"); // an http request ends with a blank line
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c); // if you've gotten to the end of the line (received a newline character) and the line is blank, the http request has ended, so you can send a reply
        if (c == '\n' && currentLineIsBlank) { // send a standard http response header
          digitalWrite(led, HIGH);
          client.println("HTTP/1.1 200 OK");
          client.println("Access-Control-Allow-Origin: *");
          client.println("Content-Type: application/json");
          client.println();
          client.print("{");
          client.print("\"pot");
          client.print("\": ");
          client.print(analogRead(Apin));
          client.println("}");
          digitalWrite(led, LOW);
          break;
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        }
        else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }
    delay(1);
    client.stop();
    Serial.println("client disonnected");
  }
}


void printWifiStatus() { Serial.print("SSID: "); Serial.println(WiFi.SSID()); IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: "); Serial.println(ip); long rssi = WiFi.RSSI();Serial.print("signal strength (RSSI):");
  Serial.print(rssi); Serial.println(" dBm");}
