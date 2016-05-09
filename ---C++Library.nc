//RETURN LENGTH OF STRING WHILE PASSES TO FUNTION

boolean valIn(int arr[], int x, int rng){
  for (int i = 0; i < rng; i++){
    if (arr[i] == x){
      Serial.println(arr[i]);
      return true;
    }
  return false;
}

if (valIn(myArrey, element, sizeof(myArray)/sizeof(int))){ //int is 2 bites, long int is 4.... good to know
     ...do whatever...
}
