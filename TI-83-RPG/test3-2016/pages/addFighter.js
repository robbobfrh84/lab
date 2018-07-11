var addFighter = document.getElementById('add-fighter')

for (const skill of [
    'speed',
    'strangth',
    'experience',
    'intelligence',
    'endurance',
    'coaching',
    'will Power'
  ]) {
  const skillCap = skill[0].toUpperCase() + skill.slice(1)
  const newDiv = document.createElement('div')
  newDiv.innerHTML += `
  <div>
    <div class='div1'> ${skillCap}: </div>
    <input id="userSet${skillCap}" placeHolder="...0-100" class='zero-100'>
    <input type="radio" name="${skill}Set"> |
    <input type="radio" name="${skill}Set" checked>
    Random
    <input id="randBot${skillCap}" value="0" class='zero-100'>
    <input id="randTop${skillCap}" value="100" class='zero-100'>
  </div>
  `
  addFighter.appendChild(newDiv)
  const skillInput = document.getElementById('userSet'+skillCap)
  skillInput.addEventListener('input', function () {
    console.log('click', skill, event, skillInput.value)
  })
}
