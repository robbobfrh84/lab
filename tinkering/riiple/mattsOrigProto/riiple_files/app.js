

/************************************************************
                Apply 'EQUATION GAME' to a web page
*************************************************************/



/********** VARIABLES **********/

var numberSet;              // an undefined variable to hold a set of random numbers
var target;                 // an undefined variable to hold a random target number
var solSet;                 // an undefined variable to hold a set of solutions



/********** FUNCTIONS **********/

///// generates (three) random single-digit numbers between one and [five] for the number set
function randomIntegers(num) {
  var numArray = [];    
  for (i=0; i<num; i++) {
    numArray.push(Math.floor( Math.random() * 5) + 1);
  }
  return numArray;
}


///// creates array of all permutations of the number set
function allPermutationsOf(inputArray){
  var permArr = [];                                   // an empty array to store all permutations of the input array
  var heldChars = [];                                 // an empty array to hold characters while arranging permutations
  function permute(inputArray) {
    var grabChar;                                     // an undefined variable to temporarily grab the characters pulled from the input array
    var i;
    for (i = 0; i < inputArray.length; i++) {         // (2) Loops through all of the characters in the input array;
      grabChar = inputArray.splice(i, 1)[0];            // splices out the current character from the input array and assigns it to the grabbed character variable,     (*Note: the "[0]" returns just the character, instead of array of that character . . . necessary?)
      heldChars.push(grabChar);                         // then pushes the grabbed character into the held characters array.
      if (inputArray.length === 0) {                  // (3) If the input array has been emptied in the current loop cycle (i.e., if the current held character array is a complete permutation),
      permArr.push(heldChars.slice());                  // then pushes the current held characters array into the permutations array to be stored. (WHY SLICE???-won't run without it, but can't figure out why...)
      } 
      permute(inputArray);                            // (4) Passes the now-truncated input array back into the present function.
      inputArray.splice(i, 0, grabChar);              // (5) Splices the current grabbed character into the beginning of the current input array segment.
      heldChars.pop();                                // (6) Removes the last (or only) character in the held characters array.
    }
    return permArr;                                   // (7) After the last loop cycle completes, returns the completed permuations array.
  }
  return permute(inputArray);                         // (1) Passes the input array into the permute function.
}


///// constructs a number set and target with at least one solution, and determines all possible solutions
function ConstructSetAndSolutions() {
  numberSet = randomIntegers(3);                  // a set of random integers
  target = Math.floor((Math.random() * 9) +1);    // a target number between one and [nine]
  solSet = kryptoSolutions(numberSet,target);     // a set of all solutions

  ///// determines all possible solutions
  function kryptoSolutions(numSet,targ) {
    var ops = ['*','/','+','-'];                                              // Creates an array of all operators allowed.
    var solutions = [];                                                       // Creates an empty array as a receptacle for solutions.
    var numSetPerms = allPermutationsOf(numSet);                              // Creates an array of all permutations of the number set.
    for (i=0; i<numSetPerms.length; i++) {                                    // Loops through all permutations,
      var test = numSetPerms[i];                                              // sets the test array as the current permutation;
      for (j=0; j<ops.length; j++) {                                          // loops through each operator (*,/,+,-),
        (test.length===numSet.length)?                                        // if an operator hasn't been added to the test array yet,
          test.splice(1,0,ops[j]):                                            // then splices in the first operator at index 1,
          test.splice(1,1,ops[j]);                                            // otherwise swaps in the current operator at index 1;
            for (k=0; k<ops.length; k++) {                                    // loops through each operator again,
              (test.length===numSet.length+1)?                                // if no 2nd operator has been added to the test array yet,
                test.splice(3,0,ops[k]):                                      // then splices in the first operator at what's now index 3,
                test.splice(3,1,ops[k]);                                      // otherwise swaps in the current operator at index 3;
              if (eval(test.join(' ')) == targ) {                             // if the current test array equals the target number,
                if (solutions.indexOf(test.join(' ')) === -1) {               // and doesn't match any other present solutions,
                  solutions.push(test.join(' '));                             // then pushes the test array into the solutions array.  
                }
              } else if (test.slice(1,2) == '+' || test.slice(1,2) == '-') {  // Otherwise, if first operator is + or -,
                test.splice(0,0,'(');                                         // then wraps parentheses around
                test.splice(4,0,')');                                         // the first two numbers;
                if (eval(test.join(' ')) == targ) {                           // if the current test array equals the target number,
                  if (solutions.indexOf(test.join(' ')) == -1) {              // and doesn't match any other present solutions,
                    solutions.push(test.join(' '));                           // then pushes the test array into the solutions array.  
                  }
                } 
                test.splice(0,1);                                             // Removes the
                test.splice(3,1);                                             // parentheses.
              } else if (test.slice(3,4) == '+' || test.slice(3,4) == '-') {  // Otherwise, if second operator is + or -,
                test.splice(2,0,'(');                                         // then wraps parentheses around
                test.splice(6,0,')');                                         // the second two numbers;
                if (eval(test.join(' ')) == targ) {                           // if the current test array equals the target number,
                  if (solutions.indexOf(test.join(' ')) == -1) {              // and if it doesn't match any other solutions,
                    solutions.push(test.join(' '));                           // then pushes the test array into the solutions array.  
                  }
                } 
                test.splice(2,1);                                             // removes the
                test.splice(5,1);                                             // parentheses.
              }
            }
      }
    }
    return solutions;                                                         // Returns the list of solutions (which passes the list to the variable "solSet").                   
  }
  if (solSet.length < 1) {                                                    // If there are zero solutions for the current number set,
    ConstructSetAndSolutions();                                               // then tries again with a new number set and target number until a solvable set is found.
  }
  return solSet;                                                              // Returns the list of solutions.
}


///// reveals intro phrase and solutions; changes button onlick to refresh
function revealSolutions() {

  if (solSet.length === 1) {
    document.getElementById('solution-commentary').innerHTML = 'There is only one solution for this set:<br>';
  } else if (solSet.length === 0) {
    document.getElementById('solution-commentary').innerHTML = 'There are no solutions for this set.<br>';
  } else {
    document.getElementById('solution-commentary').innerHTML = 'There are <b><span id=\'solcount\'>' + solSet.length + '</span></b> solutions for this set:<br>';
  }

  var solSetText = '';
  for (i=0; i<solSet.length; i++) {
    solSetText = solSetText + solSet[i] + ' = ' + target + '<br>';
  }
  document.getElementById('solution-equations').innerHTML = solSetText;

  document.getElementById('reveal-button').innerHTML = 'try another set';
  document.getElementById('reveal-button').onclick = function refresh(){location.reload()};

}



/********** DOCUMENT **********/

ConstructSetAndSolutions();

///// writes the number set to the document
document.getElementById('number-set').innerHTML = numberSet[0] + ' ' + numberSet[1] + ' ' + numberSet[2];

///// writes the target to the document
document.getElementById('target').innerHTML = target;

