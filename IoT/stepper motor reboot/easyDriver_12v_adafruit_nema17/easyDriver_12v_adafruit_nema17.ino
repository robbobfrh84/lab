int smDirectionPin = 2; //Direction pin
int smStepPin = 3; //Stepper pin
 
void setup(){
  /*Sets all pin to output; the microcontroller will send them(the pins) bits, it will not expect to receive any bits from thiese pins.*/
  pinMode(smDirectionPin, OUTPUT);
  pinMode(smStepPin, OUTPUT);
 
  Serial.begin(9600);
}
 
void loop(){
  digitalWrite(smDirectionPin, HIGH); //Writes the direction to the EasyDriver DIR pin. (HIGH is clockwise).
  /*Slowly turns the motor 1600 steps*/
  for (int i = 0; i < 1600; i++){
    digitalWrite(smStepPin, HIGH);
    delayMicroseconds(700);
    digitalWrite(smStepPin, LOW);
    delayMicroseconds(700);
  }
 
  delay(1000); //Pauses for a second (the motor does not need to pause between switching direction, so you can safely remove this)
 
  digitalWrite(smDirectionPin, LOW); //Writes the direction to the EasyDriver DIR pin. (LOW is counter clockwise).
  /*Turns the motor fast 1600 steps*/
  for (int i = 0; i < 1600; i++){
    digitalWrite(smStepPin, HIGH);
    //delayMicroseconds(70);
    delay(100);
    digitalWrite(smStepPin, LOW);
    delay(100);

//    delayMicroseconds(70);
  }
 
  delay(1000);
}
