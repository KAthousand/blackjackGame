// Deck of Cards API
// https://deckofcardsapi.com/
// Shuffled Deck of cards api
// `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
//  Draw a card from deck using deck id
// `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`


// Capture the start button.
const startBtn = document.querySelector('#start-btn')
// Add event listener to button to start running the program
startBtn.addEventListener('click', main)


// Write a main function that runs the program.
async function main() {

  const deckId = await getId() // capture deck id

  let player = 0 // set player to 0 indicating it is users turn
  let userTotal = 0 // set total user score to 0
  let userHand = [ // create the usersHand as 2 cards
    await drawCard(deckId, player, userTotal),
    await drawCard(deckId, player, userTotal)
  ]
  userTotal += await checkTotal(userHand, player) //check the total of users cards
  // console.log(userTotal)

  player = 1 // set the player to 1 indicating it is the dealers turn
  let dealerTotal = 0 // set the dealer score to 0
  let dealerHand = [ // create the dealerHand as two cards
    await drawCard(deckId, player, dealerTotal),
    await drawCard(deckId, player, dealerTotal)
  ]
  dealerTotal += await checkTotal(dealerHand, player) //check the total of dealers cards
  // console.log(dealerTotal)

  player = 0 // start round at users turn
  const hitBtn = document.querySelector('#hit') // add listener to hit me button with function
  hitBtn.addEventListener('click', (async () => {
    userHand.push(await drawCard(deckId, player, userTotal))
    userTotal += await checkTotal(userHand, player)
  }))

  console.log(`This is the dealer total: ${dealerTotal}`)
  const stayBtn = document.querySelector('#stay')
  stayBtn.addEventListener('click', async function () {
    await stay(deckId, player, dealerTotal, dealerHand, userTotal)
    await compare(dealerTotal, userTotal)
  })

  let resetBtn = document.querySelector('#reset-btn')
  resetBtn.addEventListener('click', async function () {
    reset(player, userTotal, userHand, dealerTotal, dealerHand, deckId)
  })
  // reset(player, userTotal, userHand, dealerTotal, dealerHand, deckId)

  async function stay(deckId, player, dealerTotal, dealerHand, userTotal) {
    player++
    console.log(`This is the dealer total again ${dealerTotal}`)
    while (dealerTotal <= 17 && userTotal < 21) {
      console.log(`less than 17`)
      dealerHand.push(await drawCard(deckId, player, dealerTotal))
      dealerTotal += await checkTotal(dealerHand, player)
    }
  }

  async function compare(dealerTotal, userTotal) {
    let endBox = document.querySelector('#end-container')

    if (dealerTotal === 21 && userTotal === 21) {
      endBox.innerHTML = `<h1>Tie goes to the House!</h1>`
    } else if (dealerTotal < 21 && dealerTotal > userTotal) {
      endBox.innerHTML = `<h1>House Wins!</h1>`
    } else if (dealerTotal > 21) {
      endBox.innerHTML = `<h1>House Bust!</h1>`
    } else if (userTotal < 21 && userTotal > dealerTotal) {
      endBox.innerHTML = `<h1>You Win!</h1>`
    } else if (userTotal > 21) {
      endBox.innerHTML = `<h1>House Wins!</h1>`
    }
  }

  async function reset(player, userTotal, userHand, dealerTotal, dealerHand, deckId) {
    userCardImg = document.querySelector('#user-card-container')
    dealerCardImg = document.querySelector('#dealer-card-container')
    userTotalContainer = document.querySelector('#user-total-container')
    dealerTotalContainer = document.querySelector('#dealer-total-container')
    reactBox = document.querySelector('#reaction-container')

    userCardImg.innerHTML = ``
    dealerCardImg.innerHTML = ``
    userTotalContainer.innerHTML = ``
    dealerTotalContainer.innerHTML = ``
    reactBox.parentNode.removeChild(reactBox.parentNode.lastChild)

    player = 0 // set player to 0 indicating it is users turn
    userTotal = 0 // set total user score to 0
    userHand = [ // create the usersHand as 2 cards
      await drawCard(deckId, player, userTotal),
      await drawCard(deckId, player, userTotal)
    ]
    userTotal += await checkTotal(userHand, player)

    player = 1 // set the player to 1 indicating it is the dealers turn
    dealerTotal = 0 // set the dealer score to 0
    dealerHand = [ // create the dealerHand as two cards
      await drawCard(deckId, player, dealerTotal),
      await drawCard(deckId, player, dealerTotal)
    ]
    dealerTotal += await checkTotal(dealerHand, player)

    // await main()
  }

}





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

// Write a function that deals the cards
async function dealCards(deckId, player, total) {
  return await drawCard(deckId, player, total), await drawCard(deckId, player, total)
}

// Write a function to draw 1 card, capturing and appending the img, resetting and returning the value.
async function drawCard(deckId, player, total) {
  let url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
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
    if (player === 0) {
      userContainer.append(cardImg)
    } else {
      dealerContainer.append(cardImg)
    }
    // get the value of the card
    let value = card[0].value
    // if the value is king queen or jack reset to 10
    if (value === 'JACK' || value === 'QUEEN' || value === 'KING') {
      value = "10"
      // if the total (para3) is less than 21, ace === 11
    } else if (total < 21 && value === 'ACE') {
      value = "11"
      // if the total (para3) is greater than 21, ace === 11
    } else if (total > 21 && value === 'ACE') {
      value = "1"
    }
    // console.log(`Value of userTotal : ${para3}`)
    // console.log(`Value of Card : ${value}`)
    return value
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Write a function that checks the value of each players cards-----------------------------
async function checkTotal(playerHand, playerNum) {

  let reactBox = document.querySelector('#reaction-container')
  let userTotalContainer = document.querySelector('#user-total-container')
  let dealerTotalContainer = document.querySelector('#dealer-total-container')

  console.log(`Player Hand: ${playerHand}`)
  let nums = playerHand.map(Number)
  let total = 0
  nums.forEach((num) => {
    total += num
  })
  if (total > 21 && nums.includes(11)) {
    total -= 10
  }
  // console.log(`line 177 ${total} `)

  // total += playerTotal
  // console.log(`PlayerTotal : ${total}`)

  if (playerNum === 0) {
    userTotalContainer.innerHTML = `<p>User Total: ${total}</p>`
  } else {
    dealerTotalContainer.innerHTML = `<p>Dealer Total: ${total}</p>`
  }
  if (total === 21 && playerHand.length < 3) {
    reactBox.innerHTML = `<h1>Natural</h1>`
  } else if (total === 21) {
    reactBox.innerHTML = `<h1>21</h1>`
  } else if (total > 21) {
    reactBox.innerHTML = `<h1>Bust</h1>`
  }
  return total
}


// Write a function to reset // 