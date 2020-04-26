const total_people = 100
const randomTransactions = 50000

const start = function() {

  // Create People
  let people = []
  for (var i = 0; i < total_people; i++) {
    people.push({
      id: i,
      money: 1000,
      wins: 0,
      loses: 0,
    })
  }

  // Random Transactions
  for (let i = 0; i < randomTransactions; i++) {
    const p1 = random(0,total_people-1)
    const p2 = random(0,total_people-1)
    if (p1 !== p2) {
      const winner = random(0,1)
      if (winner === 0) {
        people[p1].money = Math.round(people[p1].money*1.2)
        people[p1].wins++
        people[p2].money = Math.round(people[p2].money*0.83,2)
        people[p2].loses++
      }
    } else {
      i--
    }
  }

  people = people.sort((a, b) => (a.money > b.money) ? 1 : -1)

  people = people.map( (p,i) => {
    p.money = "$"+formatNumber(p.money)
    // p.rank = "#"+(people.length-i)
    p.rank = "#"+(i+1)

    return p
  })

  return people


}
const number = 123456.789;

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const random = (min, max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const people = start()
console.log(people)
