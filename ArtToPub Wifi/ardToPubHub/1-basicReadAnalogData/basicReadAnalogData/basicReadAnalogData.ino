int light = A0; 
int led = 5;

void setup() {
  Serial.begin(9600);
  pinMode(light, INPUT);
  pinMode(led, OUTPUT);
}
 
void loop() {
  
  int lightData = analogRead(light);
  int ledValue = (1024-lightData)/4;

  Serial.print("Sensor read Value: ");Serial.println(lightData);
  Serial.print("-Set LED value to: ");Serial.println(ledValue);
  Serial.println();

  analogWrite(led,ledValue);

  delay(1000);
}
