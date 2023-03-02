Given the starting (index.html) code above. Complete the following tasks...

1. Locate the global declared object `blue` and modify the code, so that the `color` value appears as the text at it's defined location 👉 x = 3 (column), y = 2 (row) 
- There could be many ways to do this. But, think about first modifying the function, or creating a separate function to add the `blue` content.

2. Now, INSTEAD of using the `blue` object's `color` value to be the content. Modify the code, so that the `blue` object is represented by the `background-color` of the box.

3. Create an Event listener that captures if one of your four arrow keys have been pressed. Test by using console.log() to print out the correct buttons being pressed.

4. Using the value of your arrow keys, modify the `blue` object's location to match the moved you assigned.

5. Modify your Move function to detect if your blue box has gone off the grid.
- OR: make it so that the blue box comes back in the other side!

6. Change the myGrid array so that instead of being a 2d array, it's an object...
```
const myGrid = {
  x: 7
  y: 6
}
```
Now, modify your buildGrid function to use the object's x/y limits instead. If you were able to make this modification. now you can change the size/dimensions of the grid easily.
- Also, you may want to modify your "edges" to use this grid object as well so you don't have to

⭐️ BONUS! Give your blue object a tail!

⭐️⭐️ BONUS BONUS! You realize you're building the game "Snake" now right? If not, now build the "Snake" game..🐍👍
