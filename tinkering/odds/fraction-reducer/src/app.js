// Get the numerator and denominator input fields
const numeratorInput = document.getElementById('numerator');
const denominatorInput = document.getElementById('denominator');

// Get the "Enter" button
const enterButton = document.getElementById('enterButton');

// Get the result div
const resultDiv = document.getElementById('result');

// Add click event listener to the "Enter" button
enterButton.addEventListener('click', reduceFraction);

// Function to reduce the fraction
function reduceFraction() {
  // Get the values from the input fields
  const numerator = parseInt(numeratorInput.value);
  const denominator = parseInt(denominatorInput.value);

  // Find the greatest common divisor (GCD) using Euclidean algorithm
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const commonDivisor = gcd(numerator, denominator);

  // Reduce the fraction by dividing both numerator and denominator by the GCD
  const reducedNumerator = numerator / commonDivisor;
  const reducedDenominator = denominator / commonDivisor;

  // Display the original and most reduced fraction in the result div
    resultDiv.innerHTML = `
      Original fraction: ${numerator}/${denominator} <br>
      Most reduced fraction: ${reducedNumerator}/${reducedDenominator}
    `;
}