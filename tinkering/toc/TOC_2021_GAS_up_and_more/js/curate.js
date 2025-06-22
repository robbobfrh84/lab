async function _curate_fighters() {

  return SHEET.getFighters().then((data)=>{
    fighters = []
    for (var i = 0; i < data.length; i++) { // 🚨 WHY? because we need it in this order... doing it dyanmically will upset the order for the spreadsheet styled list page...
      fighters.push({
        name: data[i].name,
        gender: data[i].gender,
        age: data[i].age,
        skills:  {
          speed: data[i].speed,
          strangth: data[i].strangth,
          experience: data[i].experience,
          intelligence: data[i].intelligence,
          willPower: data[i].willPower
        },
        rating: data[i].rating,
        wins: data[i].wins,
        losses: data[i].losses,
        // winP: data[i].winP,
        status: data[i].status,
        history: JSON.parse(data[i].history),
        id: JSON.parse(data[i]._Id)._Id,
      })
    }
    _page_list(fighters)
    return ""
  })

}
