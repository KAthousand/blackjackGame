// Deck of Cards API
// https://deckofcardsapi.com/
// Shuffled Deck of cards api
// `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
//  Draw a card from deck using deck idl
// `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`

// Capture the start button.
const startBtn = document.querySelector('#start-btn')
// Add event listener to button to start running the program
startBtn.addEventListener('click', main)

// Write a main function that runs the program.-------------------------------------------
async function main() {

  const deckId = await getId() // capture deck id
  console.log(deckId)
  const user = { // define user object
    player: 0,
    total: 0,
    hand: [],
    deck: deckId
  }

  const dealer = { // define dealer object
    player: 1,
    total: 0,
    hand: [],
    deck: deckId
  }
  // deal two cards to user and show total value.
  user.hand = [await drawCard(user)]
  user.hand.push(await drawCard(user))
  user.total = await checkTotal(user)

  // deal two cards to dealer and show total value
  dealer.hand = [await drawCard(dealer)]
  dealer.hand.push(await drawCard(dealer))
  dealer.total = await checkTotal(dealer)

  // offer option to hit or stay
  const hitBtn = document.querySelector('#hit')
  hitBtn.addEventListener('click', async function () {
    await hitMe(user)
  })

  const stayBtn = document.querySelector('#stay')
  stayBtn.addEventListener('click', async function () {
    await stay(dealer, user)
    // compare each players total values
    await compare(dealer, user)
  })

  // use reset button to clear and reset
  const resetBtn = document.querySelector('#reset-btn')
  const players = { user, dealer }
  resetBtn.addEventListener('click', async function () {
    await reset(players)
  })

} // End of main function!------------------------------------------------------------

// Write a function to capture the ID of a shuffled deck,
async function getId() {
  let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  try {
    const response = await axios.get(url)
    //capture and return the deck id
    const deckId = response.data.deck_id
    // console.log(deckId)
    return deckId
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Write a function to draw a card
async function drawCard(player) {
  let url = `https://deckofcardsapi.com/api/deck/${player.deck}/draw/?count=1`
  try {
    const response = await axios.get(url)
    let card = response.data.cards
    // console.log(card)

    // grab containers for user container and dealer container from html
    userContainer = document.querySelector('#user-card-container')
    dealerContainer = document.querySelector('#dealer-card-container')

    // create img element to put the card img in
    const cardImg = document.createElement('img')
    cardImg.className = 'cardimg'
    cardImg.src = `${card[0].image}`

    // append to container depending on which player is playing
    if (player.player === 0) {
      userContainer.append(cardImg)
    } else {
      dealerContainer.append(cardImg)
    }
    // get the value of the card
    let value = card[0].value
    // if the value is king queen or jack reset to 10
    if (value === 'JACK' || value === 'QUEEN' || value === 'KING') {
      value = "10"
      // if the total is less than 21, ace === 11
    } else if (player.total < 21 && value === 'ACE') {
      value = "11"
      // if the tota is greater than 21, ace === 11
    } else if (player.total > 21 && value === 'ACE') {
      value = "1"
    }
    value = Number(value)
    // console.log(value)
    return value
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Write a function to check the total of the player's cards
async function checkTotal(player) {

  let reactBox = document.querySelector('#reaction-container')
  let userTotalContainer = document.querySelector('#user-total-container')
  let dealerTotalContainer = document.querySelector('#dealer-total-container')

  if (player.player === 0) {
    console.log(`User Hand: ${player.hand}`)
  } else {
    console.log(`Dealer Hand: ${player.hand}`)
  }
  console.log(player.hand)
  let total = 0
  player.hand.forEach((num) => {
    total += num
  })
  if (total > 21 && player.hand.includes(11)) {
    total -= 10
  }

  if (player.player === 0) {
    userTotalContainer.innerHTML = `<p>User Total: ${total}</p>`
    console.log(`User total: ${total}`)
  } else {
    dealerTotalContainer.innerHTML = `<p>Dealer Total: ${total}</p>`
    console.log(`Dealer total: ${total}`)
  }
  if (total === 21 && player.hand.length < 3) {
    reactBox.innerHTML = `<h1>Natural</h1>`
  } else if (total === 21) {
    reactBox.innerHTML = `<h1>21</h1>`
  } else if (total > 21) {
    reactBox.innerHTML = `<h1>Bust</h1>`
  }
  return total
}

// Write a function for hit me!
async function hitMe(player) {
  player.hand.push(await drawCard(player))
  player.total = await checkTotal(player)
  console.log(player)
  return player
}

// Write a function for stay!
async function stay(player, otherplayer) {
  if (player.total < otherplayer.total && otherplayer.total <= 21) {
    while (player.total < 17 || player.total < otherplayer.total) {
      await hitMe(player)
      player.total = checkTotal(player)
    }
  }
  return player
}


// Write a function to compare totals!
async function compare(dealer, user) {
  let endBox = document.querySelector('#end-container')
  // console.log(`User Total inside Compare Func: ${user.Total}`)
  // console.log(`Dealer Total inside Compare Func: ${dealer.Total}`)
  if (dealer.total === user.total && dealer.total <= 21) {
    endBox.innerHTML = `<h1>Tie goes to the House!</h1>`
  } else if (dealer.total <= 21 && dealer.total > user.total) {
    endBox.innerHTML = `<h1>House Wins!</h1>`
  } else if (dealer.total > 21 && user.total < 21) {
    endBox.innerHTML = `<h1>House Bust! You Win!</h1>`
  } else if (user.total <= 21 && user.total > dealer.total) {
    endBox.innerHTML = `<h1>You Win!</h1>`
  } else if (user.total > 21) {
    endBox.innerHTML = `<h1>House Wins!</h1>`
  }
}

// Write a function to reset the board and players
async function reset(players) {
  userCardImg = document.querySelector('#user-card-container')
  dealerCardImg = document.querySelector('#dealer-card-container')
  userTotalContainer = document.querySelector('#user-total-container')
  dealerTotalContainer = document.querySelector('#dealer-total-container')
  reactBox = document.querySelector('#reaction-container')
  endBox = document.querySelector('#end-container')

  userCardImg.innerHTML = ``
  dealerCardImg.innerHTML = ``
  userTotalContainer.innerHTML = ``
  dealerTotalContainer.innerHTML = ``
  if (reactBox.innerHTML != '') {
    reactBox.innerHTML = ''
  }
  reactBox.innerHTML = ``
  if (endBox.innerHTML != '') {
    endBox.innerHTML = ''
  }

  players.user.total = 0
  players.user.hand = []
  players.dealer.total = 0
  players.dealer.hand = []

  players.user.hand = [await drawCard(players.user)]
  players.user.hand.push(await drawCard(players.user))
  players.user.total = await checkTotal(players.user)

  players.dealer.hand = [await drawCard(players.dealer)]
  players.dealer.hand.push(await drawCard(players.dealer))
  players.dealer.total = await checkTotal(players.dealer)

  return players
}