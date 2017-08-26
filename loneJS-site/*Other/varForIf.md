### Dynamic html Attributes with LoneJS
- var
- for
- if

Object to be used in Examples
```javascript

c.data = {
  states: [
    name: 'Idaho'
    town: {
      school: [
        class: {
          teacher: 'Mr. Smith',
          room: 23,
          students: 19,
          grade: [ 10, 11, 12 ]
        }
      ]
    }
  ]
}

```

---
## - Var

#### Purpose
- for shortening long var names from JS to write innerHtml data in a readable clean way

- for example:
```html
<div var="{x} c.data.state[0].town.schools[0].class">
    Teacher {x}.teacher in room # {x}.room has
    {x}.students students in the {x}.grade[0] grade.
</div> ```

- here: the declared `{x}` will be replaced by the value for `c.data.state[0].town.schools[0].class` and any additional directories within the JS object, like: `{x}.grade[0]`.

---
### For

----
### iF
