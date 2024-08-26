// Example AI chat info

// use "q:" for the question and "a:" for the answer

// q: what is instanciation in javascript?
// a: Instanciation is the process of creating a new instance of a class. 
//    In JavaScript, you can create a new instance of a class by using the 
//    "new" keyword.

// q: What does SOLID stand for in object-oriented programming?
// a: SOLID is an acronym that stands for five principles of object-oriented

// q: what are the five principles of SOLID?
// a: The five principles of SOLID are:
//    - Single Responsibility Principle
//    - Open/Closed Principle
//    - Liskov Substitution Principle
//    - Interface Segregation Principle
//    - Dependency Inversion Principle

// ----


class Car { // NOTE: here i just started by typing "class Car" and let it populate the example and pressed "tab" to accept.
  constructor(make, model, year, color, mileage, fuelType, engineSize, transmission, numberOfDoors, numberOfSeats, topSpeed) {
    this.make = make;
    this.model = model;
    this.year = year;
    // NOTE here I used the ✨ icon and asked to create 10 more properties related to  a car.
    this.color = color;
    this.mileage = mileage;
    this.fuelType = fuelType;
    this.engineSize = engineSize;
    this.transmission = transmission;
    this.numberOfDoors = numberOfDoors;
    this.numberOfSeats = numberOfSeats;
    this.topSpeed = topSpeed;
  }

  drive() {
    return "Vroom vroom!";
  }

  honk() {
    return "Beep beep!";
  }

  estimateValue() {
    // NOTE: here i used the the ✨ icon and asked 
    // - "create a method that estimates the value of the car""
    const ageDepreciation = this.year * 0.1;
    const mileageDepreciation = this.mileage * 0.001;
    const estimatedValue = 10000 - (ageDepreciation + mileageDepreciation);

    return estimatedValue;
  }

}