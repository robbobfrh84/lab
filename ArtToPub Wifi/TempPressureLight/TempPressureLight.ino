#include <WiFi101.h>
#include <Wire.h>
#define ADDRESS 0x76 //0x77

//vvvvvvvvvv- Wifi declarations -vvvvvvvvvv//
const char* ssid = "2WIRE648";
const char* password = "3519464889";
int status = WL_IDLE_STATUS;
WiFiClient client;

//vvvvvvvvvv- PubNub declarations and variables -vvvvvvvvvv//
const char server[] = "pubsub.pubnub.com";

//vvvvvvvvvv- Project variables -vvvvvvvvvv//
uint32_t D1 = 0; uint32_t D2 = 0; int64_t dT = 0;int32_t TEMP = 0;
int64_t OFF = 0; int64_t SENS = 0; int32_t P = 0;uint16_t C[7];
float Temperature;
float Pressure;
String t;
String p;
String l;

int light = A0;    
int lightData = 0;
long int delayTime = 90000;

void setup() {
  Wire.begin();
  Serial.begin(9600); 
  delay(100);
  pinMode(light, INPUT);

  while (status != WL_CONNECTED) { // Connect to WiFi network
    Serial.print("Attempting to connect to SSID: "); 
    Serial.println(ssid); 
    status = WiFi.begin(ssid, password);  
    delay(10000); 
  } 
  
  initial(ADDRESS);
  printWifiStatus();
}
//----------------------------------------------------------------//
//----------                 VOID LOOP                  ----------//
//----------------------------------------------------------------//
void loop() {
  lightData = analogRead(light);
 
  D1 = getVal(ADDRESS, 0x48); // Pressure raw
  D2 = getVal(ADDRESS, 0x58);// Temperature raw
  
  dT   = D2 - ((uint32_t)C[5] << 8);
  OFF  = ((int64_t)C[2] << 16) + ((dT * C[4]) >> 7);
  SENS = ((int32_t)C[1] << 15) + ((dT * C[3]) >> 8);
  
  TEMP = (int64_t)dT * (int64_t)C[6] / 8388608 + 2000;

  if(TEMP < 2000) // if temperature lower than 20 Celsius 
  {
   int32_t T1    = 0;
   int64_t OFF1  = 0;
   int64_t SENS1 = 0;
  
   T1    = pow(dT, 2) / 2147483648;
   OFF1  = 5 * pow((TEMP - 2000), 2) / 2;
   SENS1 = 5 * pow((TEMP - 2000), 2) / 4;
   
   if(TEMP < -1500) // if temperature lower than -15 Celsius 
   {
     OFF1  = OFF1 + 7 * pow((TEMP + 1500), 2); 
     SENS1 = SENS1 + 11 * pow((TEMP + 1500), 2) / 2;
   }
   
   TEMP -= T1;
   OFF -= OFF1; 
   SENS -= SENS1;
  }
 
  Temperature = (float)TEMP / 100; 
  P  = ((int64_t)D1 * SENS / 2097152 - OFF) / 32768;
  Pressure = (float)P / 100;

  Serial.print("D1: "); Serial.println(D1);
  Serial.print("D2: "); Serial.println(D2);
  Serial.print("temp: "); Serial.println(Temperature);
  Serial.print("Pressure: "); Serial.println(Pressure);
  Serial.print("Light: ");Serial.println(lightData);
  
  t = String(D2);
  p = String(D1);
  l = String(lightData);
  
  Serial.println(t);
  Serial.println(p);
  Serial.println(l);
  Serial.println();

  
  client.stop(); 
  if (client.connect(server, 80)) {
    client.println("GET /publish/pub-c-6d531795-b849-4e94-b216-b518015fa7df/sub-c-65f59724-23b5-11e6-8bc8-0619f8945a4f/0/1a/0/%7B%22temp%22%3A"+t+"%2C%22press%22%3A"+p+"%2C%22light%22%3A"+l+"%7D HTTP/1.1");
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

long getVal(int address, byte code){
 unsigned long ret = 0;
 Wire.beginTransmission(address);
 Wire.write(code);
 Wire.endTransmission();
 delay(10);
 // start read sequence
 Wire.beginTransmission(address);
 Wire.write((byte) 0x00);
 Wire.endTransmission();
 Wire.beginTransmission(address);
 Wire.requestFrom(address, (int)3);
 if (Wire.available() >= 3)
 {
   ret = Wire.read() * (unsigned long)65536 + Wire.read() * (unsigned long)256 + Wire.read();
 }
 else {
   ret = -1;
 }
 Wire.endTransmission();
 return ret;
}

void initial(uint8_t address){
 Serial.println();
 Serial.println("PROM COEFFICIENTS ivan");

 Wire.beginTransmission(address);
 Wire.write(0x1E); // reset
 Wire.endTransmission();
 delay(10);


 for (int i=0; i<6  ; i++) {

   Wire.beginTransmission(address);
   Wire.write(0xA2 + (i * 2));
   Wire.endTransmission();

   Wire.beginTransmission(address);
   Wire.requestFrom(address, (uint8_t) 6);
   delay(1);
   if(Wire.available())
   {
      C[i+1] = Wire.read() << 8 | Wire.read();
   }
   else {
     Serial.println("Error reading PROM 1"); // error reading the PROM or communicating with the device
   }
   Serial.println(C[i+1]);
 }
 Serial.println();
}
