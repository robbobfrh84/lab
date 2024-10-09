const build_color_selector = () => {
  GROUPS.forEach(color => {
    const input = document.createElement('input')
    input.type = 'radio'
    input.id = 'colorButton_'+color.id
    input.name = 'color'
    input.value = color.color
    input.checked = color.color == selectedGroup.color ? 'checked' : ''
    input.addEventListener('click', function() {
      selectedGroup = color
      selected_state_color = selectedGroup.color
    })

    const label = document.createElement('label')
    label.htmlFor = 'colorButton_'+color.id
    label.classList.add(color.color)  

    groupColorSelector.appendChild(input)
    groupColorSelector.appendChild(label)
  })
}