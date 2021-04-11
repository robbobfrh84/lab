int LatchPin  = 8; // Latch
int ClockPin  = 9; // Clock
int DataPin   = 10; // Serial Data

unsigned int ControllerData = 0;

void setup() {
  Serial.begin(38400);
  pinMode(LatchPin,OUTPUT);
  pinMode(ClockPin,OUTPUT);
  pinMode(DataPin,INPUT);
  
  digitalWrite(LatchPin, HIGH);
  digitalWrite(ClockPin, HIGH);
} 
void controllerRead() {
  
  // reset controller states and data
  ControllerData = 0;
  digitalWrite(LatchPin, LOW);
  digitalWrite(ClockPin, HIGH);
  
  //controller needs to latch the state of all buttons
  digitalWrite(LatchPin,HIGH);
  delayMicroseconds(12);
  digitalWrite(LatchPin,LOW);
  delayMicroseconds(6);
  
  // Read controller data (initial reading)
  ControllerData = digitalRead(DataPin);
  
  // Send 16 clock pulses, one for each button. 
  for (int i = 0; i < 16; i ++) {
	digitalWrite(ClockPin,LOW);
	delayMicroseconds(6);
	ControllerData = ControllerData << 1;
	ControllerData = ControllerData + digitalRead(DataPin) ;
        Serial.print(ControllerData);
        Serial.print(digitalRead(DataPin));
	delayMicroseconds(6);
	digitalWrite(ClockPin,HIGH);
  }
  ControllerData = ~ControllerData;
  Serial.println();
  Serial.println(ControllerData); Serial.println();
  delay(500);
  
}

void loop(){
  // Read controller data
  controllerRead();
  
    
}  
