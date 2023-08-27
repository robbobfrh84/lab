### Where I left off

# Next ~3

# TODO
- Mitosis
  - do NOT need all organisms to be canvas paths. just convert during process.
- Remove food from dish.food when eating is established.
  - Create separate loop for drawing digested food.  
- Create a relative "collision" with size / velocity
- move 1000+ old poop from foods to staticPoop or something like that.
- Dragging poop: Here's the idea
  - have the last 500-1000 poops do what they're doing.
  - after 500-1000 move to static canvas layer(won't have to render every time)
  - Why they're draggin: they're actually being changed to "eaten" but since they're old they don't effect the org, but try to drift to center.
    - This should probably be handled as if planned. with an actual StuckPoop() method.

# Annimations
- make the membrane pulse while eating
- make the core shrink while pooping.

# Issues
- Figure out how to have the membrane on the OUTSIDE (Defaults to 50%), figured it out to be in the INSIDE... how to make it on the outside? maybo go back to seperate circles for organisms

# Design
- Have the [save] button be a bg 1-min progress bar that auto saves when fill
  - Flashes Saved, then the bg resets.
  - Click it and it autosaves.

---
# WATER (Way down the river)
- predator.
