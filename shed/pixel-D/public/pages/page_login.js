buildAccounts = (acnts)=>{
  if (acnts) {
    document.getElementById('page-login').innerHTML = `
      <br>
      Select User: <br><br>
    `
    for (const user in accounts) {
      if (accounts[user].account) {
        document.getElementById('page-login').innerHTML += `
        <button class='b1 b3' onclick="setAccount('${user}')">${user}</button><br>
        `
      }
    }
    document.getElementById('page-login').innerHTML += `
      <br>
      <em>! Note: In demo-mode, user can control all users !</em>
    `
  } else {
    ddbGet('accounts', (data)=>{
      accounts = data.Item
      document.getElementById('page-login').innerHTML = `
        <br>
        Select User: <br><br>
      `
      for (const user in accounts) {
        if (accounts[user].account) {
          document.getElementById('page-login').innerHTML += `
          <button class='b1 b3' onclick="setAccount('${user}')">${user}</button><br>
          `
        }
      }
      document.getElementById('page-login').innerHTML += `
        <br>
        <em>! Note: In demo-mode, user can control all users !</em>
      `
    })
  }

}
