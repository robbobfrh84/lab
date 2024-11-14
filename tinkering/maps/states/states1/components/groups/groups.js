const groups_build = () => {
  groups_container.innerHTML = /*html*/`  
    <span id="groupTitle">Groups</span>
    <div id="group_ColorSelector"></div>
    <span id="addGroupButton" onclick="groups_add()" class="group_edit-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span id="editGroupButton" onclick="groups_edit()" class="group_edit-icon">
      <svg width="24" height="24" viewBox="0 1 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="darkgoldenrod" d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25Z" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        <path fill="brown" d="M14.06 6.19L16.85 3.4C17.24 3.01 17.87 3.01 18.26 3.4L20.6 5.74C20.99 6.13 20.99 6.76 20.6 7.15L17.81 9.94" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  `
  groups_build_color_buttons()
}

const groups_build_color_buttons = () => {
  let html = STATE.groups.map( color => { return /*html*/`
    <input type="radio" id="colorButton_${color.id}" name="color" value="${color.color}" ${color.id == STATE.selectedGroupId ? 'checked' : ''}>
    <label for="colorButton_${color.id}" style="background-color: ${color.color}"></label>
  `}).join('')
  group_ColorSelector.innerHTML = html

  STATE.groups.forEach(color => {
    document.getElementById('colorButton_' + color.id).addEventListener('click', function() {
      STATE.selectedGroupId = color.id;
    });
  });
}

const groups_add = () => { 
  modal({
    header: 'Add Group',
    content: /*html*/`
      <label for="groupColor">Color</label>
      <input type="color" id="groupColor" name="groupColor" value="#ff0000">
      <label for="groupName">Name</label>
      <input type="text" id="groupName" name="groupName">
      <button onclick="groups_add_save()">Add</button>
    `
  }) 
}

const groups_edit = () => { 
  const group = STATE.groups.find(group => group.id == STATE.selectedGroupId);
  const colorHex = /^#[0-9A-F]{6}$/i.test(group.color) ? group.color : rgbToHex(group.color);
  modal({
    header: 'Edit Group',
    content: /*html*/`
      <label for="groupColor">Color</label>
      <input type="color" id="groupColor" name="groupColor" value="${colorHex}">
      <label for="groupName">Name</label>
      <input type="text" id="groupName" name="groupName" value="${group.label}">
      <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
        <button onclick="groups_edit_save()">Save</button>
        <button onclick="modal_close()" style="background-color: #f44336; color: white;">Cancel</button>
      </div>
    `
  }) 
}

const rgbToHex = (color) => {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = color;
  return ctx.fillStyle;
}

const groups_add_save = () => {
  const groupColor = document.getElementById('groupColor').value
  const groupName = document.getElementById('groupName').value
  const newId = STATE.groups.reduce((maxId, group) => Math.max(maxId, group.id), 0) + 1
  STATE.groups.push({ id: newId, color: groupColor, label: groupName, states: [] })
  groups_build()
  STATE.selectedGroupId = newId
  modal_close()
}

const groups_edit_save = () => {
  const groupColor = document.getElementById('groupColor').value
  const groupName = document.getElementById('groupName').value
  const group = STATE.groups.find(group => group.id == STATE.selectedGroupId)
  group.color = groupColor
  group.label = groupName
  groups_build()
  tables_build()
  modal_close()
}