const color_selector_build = () => {
  STATE.groups.forEach(color => {
    const input = document.createElement('input')
    input.type = 'radio'
    input.id = 'colorButton_'+color.id
    input.name = 'color'
    input.value = color.color
    input.checked = color.id == STATE.selectedGroupId ? 'checked' : ''
    input.addEventListener('click', function() {
      STATE.selectedGroupId = color.id
    })

    const label = document.createElement('label')
    label.htmlFor = 'colorButton_'+color.id
    label.style.backgroundColor = color.color
    groupColorSelector.appendChild(input)
    groupColorSelector.appendChild(label)
  })
}