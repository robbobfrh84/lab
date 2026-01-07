let currentSort = { column: null, direction: 'desc' }
let currentRegionFilter = 'ALL' // Track the current region filter

const initializeRegionFilter = function() {
  const container = document.getElementById('region_filter_container')
  if (!container) return
  
  const sheet = window.currentSheetData
  if (!sheet || !sheet.rows) return
  
  // Get all unique regions from the data
  const regionsInData = new Set()
  const knownRegions = regionsObj.map(r => r.name)
  let hasUnknown = false
  
  sheet.rows.forEach(row => {
    if (row.region) {
      regionsInData.add(row.region)
    } else {
      hasUnknown = true
    }
    // Check if region is unknown (not in regionsObj)
    if (row.region && !knownRegions.includes(row.region)) {
      hasUnknown = true
    }
  })
  
  // Create ALL button
  let buttonsHTML = '<button class="selected" onclick="filterByRegion(\'ALL\')">ALL</button>'
  
  // Create buttons only for regions that exist in the data
  regionsObj.forEach(region => {
    if (regionsInData.has(region.name)) {
      const style = `background-color: ${region.color}; color: ${region.font};`
      buttonsHTML += `<button style="${style}" onclick="filterByRegion('${region.name}')">${region.name}</button>`
    }
  })
  
  // Create Unknown button only if there are unknown regions
  if (hasUnknown) {
    buttonsHTML += '<button class="unknown" onclick="filterByRegion(\'Unknown\')">Unknown</button>'
  }
  
  container.innerHTML = buttonsHTML
  
  // Set initial title
  const titleElement = document.getElementById('region_title')
  if (titleElement) {
    titleElement.textContent = 'All Regions'
  }
}

const filterByRegion = function(regionName) {
  currentRegionFilter = regionName
  
  // Update button selected state
  const buttons = document.querySelectorAll('.region-filter button')
  buttons.forEach(btn => {
    if (btn.textContent === regionName) {
      btn.classList.add('selected')
    } else {
      btn.classList.remove('selected')
    }
  })
  
  // Update region title
  const titleElement = document.getElementById('region_title')
  if (titleElement) {
    if (regionName === 'ALL') {
      titleElement.textContent = 'All Regions'
    } else {
      titleElement.textContent = `${regionName} Region`
    }
  }
  
  // Re-render table with filter
  const sheet = window.currentSheetData
  if (sheet) {
    setTable(sheet)
  }
}

const setTable = function(data) {

  if (data.rows.length > 0) {
    
    // Filter by region if not 'ALL'
    let filteredRows = [...data.rows]
    if (currentRegionFilter !== 'ALL') {
      if (currentRegionFilter === 'Unknown') {
        // Show rows with no region or regions not in regionsObj
        const knownRegions = regionsObj.map(r => r.name)
        filteredRows = filteredRows.filter(row => !row.region || !knownRegions.includes(row.region))
      } else {
        // Show only rows matching the selected region
        filteredRows = filteredRows.filter(row => row.region === currentRegionFilter)
      }
    }
    
    // Sort data if a sort is active
    let sortedRows = [...filteredRows]
    if (currentSort.column) {
      sortedRows.sort((a, b) => {
        let aVal, bVal
        
        if (currentSort.column === 'percent') {
          aVal = calcWinPercentNum(a)
          bVal = calcWinPercentNum(b)
        } else {
          aVal = a[currentSort.column]
          bVal = b[currentSort.column]
        }
        
        if (aVal === bVal) return 0
        if (aVal === '' || aVal === null || aVal === undefined) return 1
        if (bVal === '' || bVal === null || bVal === undefined) return -1
        
        if (currentSort.direction === 'asc') {
          return aVal < bVal ? -1 : 1
        } else {
          return aVal > bVal ? -1 : 1
        }
      })
    }
    
    // Get region colors if a specific region is selected
    let headerStyle = ''
    let borderColor = 'rgba(0, 0, 0, 0.1)'
    if (currentRegionFilter !== 'ALL' && currentRegionFilter !== 'Unknown') {
      const selectedRegion = regionsObj.find(r => r.name === currentRegionFilter)
      if (selectedRegion) {
        headerStyle = `background-color: ${selectedRegion.color}; color: ${selectedRegion.font};`
        // Create a semi-transparent version of the region color for borders
        const rgb = selectedRegion.color.match(/\w\w/g)
        if (rgb) {
          const r = parseInt(rgb[0], 16)
          const g = parseInt(rgb[1], 16)
          const b = parseInt(rgb[2], 16)
          borderColor = `rgba(${r}, ${g}, ${b}, 0.3)`
        }
      }
    }
    
    let tableHTML = '<table><thead><tr>'
    // Add non-sortable row number column
    tableHTML += `<th class="row-number-header" style="${headerStyle}">#</th>`
    tableColumns.forEach(col => { 
      const isActive = currentSort.column === col.name
      const activeClass = isActive ? 'sorted-header' : ''
      // Flip arrows for text columns (name, region, sex)
      const isTextColumn = ['name', 'region', 'sex'].includes(col.name)
      const upClass = isActive && ((isTextColumn && currentSort.direction === 'asc') || (!isTextColumn && currentSort.direction === 'desc')) ? 'active-arrow' : 'inactive-arrow'
      const downClass = isActive && ((isTextColumn && currentSort.direction === 'desc') || (!isTextColumn && currentSort.direction === 'asc')) ? 'active-arrow' : 'inactive-arrow'
      tableHTML += `<th class="${activeClass}" style="${headerStyle}" onclick="sortTable('${col.name}')">${col.label}<span class="sort-arrows"><span class="${upClass}">▲</span><span class="${downClass}">▼</span></span></th>` 
    })
    tableHTML += '</tr></thead><tbody>'
    
    sortedRows.forEach((row, index) => {
      const region = regionsObj.find(r => r.name === row.region)
      tableHTML += `<tr data-region="${row.region || ''}" style="border-bottom-color: ${borderColor};">`
      // Add row number cell
      tableHTML += `<td class="row-number" style="border-bottom-color: ${borderColor};">${index + 1}</td>`
      tableColumns.forEach(col => {
        let value = ''
        if (col.func) {
          value = col.func(row)
        } else if (col.name === 'region' && row.region) {
          const regionColor = region ? region.color : ''
          const fontColor = region ? region.font : ''
          const regionStyle = region ? `background-color: ${regionColor}; color: ${fontColor};` : 'border: 1px solid rgba(128, 128, 128, 0.25); color: black; background-color: transparent;'
          value = `<span class="pill-box" style="${regionStyle}">${row.region}</span>`
        } else {
          value = row[col.name] !== undefined && row[col.name] !== null ? row[col.name] : ''
        }
        tableHTML += `<td style="border-bottom-color: ${borderColor};">${value}</td>`
      })
      tableHTML += '</tr>'
    })
    
    tableHTML += '</tbody></table>'
    table_container.innerHTML = tableHTML
  } else {
    table_container.innerHTML = " * This table is empty. Select [Create] "
  }

}

const sortTable = function(columnName) {
  if (currentSort.column === columnName) {
    currentSort.direction = currentSort.direction === 'desc' ? 'asc' : 'desc'
  } else {
    currentSort.column = columnName
    // Name, region, and sex default to ascending (A-Z), others default to descending
    currentSort.direction = (columnName === 'name' || columnName === 'region' || columnName === 'sex') ? 'asc' : 'desc'
  }
  
  // Re-render table with current data
  const sheet = window.currentSheetData
  if (sheet) {
    setTable(sheet)
  }
}

function calcWinPercentNum(row) {
  const w = row.wins || 0
  const l = row.losses || 0
  const total = w + l
  if (total === 0) return -1
  return w / total
}

function calcWinPercent(row) {
  const w = row.wins || 0
  const l = row.losses || 0
  const total = w + l
  if (total === 0) return ''
  const percent = w / total
  if (percent === 1) return '1.000'
  return percent.toFixed(3).substring(1)
}