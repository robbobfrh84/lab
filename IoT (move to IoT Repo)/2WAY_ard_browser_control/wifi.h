char ssid[] = "ATT6R6j6Y8";
char pass[] = "22572+5w7b7z";
const IPAddress server(192,168,1,85);
const int httpPort = 8080;
int keyIndex = 0;
int status = WL_IDLE_STATUS;
WiFiClient client; // YO! Look! Error here. may need to toggle what lib your using in other/initial code page...


void printWiFiStatus() {
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

void start() {
  // while (!Serial) { ; } // with the required. it won't work withOUT  the monitor open. 
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
    delay(10000);
  }
  Serial.println("Connected to wifi");
  printWiFiStatus();
  Serial.println("\nStarting connection to server...");
}

void request(String req, String query) {
  if (client.connect(server, httpPort)) {
    Serial.println("connected to server");
    client.println(req+" "+query+" HTTP/1.1");
    client.println("Connection: close");
    client.println();
  }
}
