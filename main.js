// Deck of Cards API
// https://deckofcardsapi.com/
// Shuffled Deck of cards api
// `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
//  Draw a card from deck using deck idl
// `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`

//Capture from html.
const title = document.querySelector('#title')
const dealerCardBack = document.querySelector('#dealer-card-back')
const userCardBack = document.querySelector('#user-card-back')
const hitBtn = document.querySelector('#hit')
const stayBtn = document.querySelector('#stay')
const resetBtn = document.querySelector('#reset-btn')
let endBox = document.querySelector('#end-container')
const content = document.querySelector('.content-wrapper')
const endWrapper = document.querySelector('.end-content-wrapper')

//Begin Game Functionality!---------------------------------------------------------------
// Capture the start button.
const startBtn = document.querySelector('#start-btn')
// Add event listener to button to start running the program
startBtn.addEventListener('click', main)

// Write a main function that runs the program.-------------------------------------------
async function main() {

  const deckId = await getId() // capture deck id

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
  setTimeout(removeHide, 1000, dealerCardBack)
  dealerCardBack.classList.add('dealer-slide')
  dealer.hand = [await drawCard(dealer)]
  dealer.total = await checkTotal(dealer)

  //reveal hit and stay btns
  setTimeout(toggleHide, 0, hitBtn)
  setTimeout(toggleHide, 0, stayBtn)

  // offer option to hit or stay
  hitBtn.addEventListener('click', async function () {
    await hitMe(user)
    if (user.total >= 21) {
      await compare(dealer, user)
    }
    return user
  })

  stayBtn.addEventListener('click', async function () {
    await stay(dealer, user)
  })

  // use reset button to clear and reset

  const players = { user, dealer }
  resetBtn.addEventListener('click', async function () {
    await reset(players)
  })

  // STYLE FUNCTIONALITY--------------------------------------------------------------
  startBtn.className = 'fade-out'
  title.className = 'fade-out'
  setTimeout(addHide, 600, startBtn)
  setTimeout(addHide, 600, title)
} // End of main function!------------------------------------------------------------

// Write a function to capture the ID of a shuffled deck,
async function getId() {
  let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  try {
    const response = await axios.get(url)
    //capture and return the deck id
    const deckId = response.data.deck_id

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

    // grab containers for user container and dealer container from html
    userContainer = document.querySelector('#user-card-container')
    dealerContainer = document.querySelector('#dealer-card-container')

    // create img element to put the card img in
    const cardImg = document.createElement('img')
    cardImg.className = 'cardimg'
    cardImg.classList.add('fade-in')
    cardImg.src = `${card[0].image}`
    // append to container depending on which player is playing
    if (player.player === 0) {
      if (player.hand.length < 1) {
        userContainer.append(userCardBack)
        userCardBack.classList.add('user-slide')
        userCardBack.classList.remove('hide')
      }
      if (player.hand.length >= 1) {
        cardImg.classList.add('special-margin')
        userCardBack.classList.remove('hide')
      }
      setTimeout(addHide, 1000, userCardBack)
      setTimeout(appendSlow, 1000, userContainer, cardImg)

    } else if (player.player == 1 && player.hand.length < 1) {
      setTimeout(appendSlow, 1000, dealerContainer, cardImg)

    } else if (player.player == 1 && player.hand.length >= 1) {
      cardImg.classList.add('special-margin')
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
    return value
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Write a function to check the total of the player's cards
async function checkTotal(player) {

  let reactBox = document.querySelector('#reaction-container')
  let userTotalContainer = document.querySelector('#user-total-container')

  if (player.player === 0) {
  } else {
  }
  let total = 0
  player.hand.forEach((num) => {
    total += num
  })
  if (total > 21 && player.hand.includes(11)) {
    total -= 10
  }

  if (player.player === 0) {
    setTimeout(removeHide, 1000, userTotalContainer)
    userTotalContainer.classList.add('fade-in')
    userTotalContainer.innerHTML = `<p>YOUR TOTAL: ${total}</p>`

  } else if (player.player === 1 && player.hand.length >= 2) {
    dealerCardBack.className = 'fade-out'
    dealerCardBack.classList.add('hide')
  }
  return total
}

// Write a function for hit me!
async function hitMe(player) {
  player.hand.push(await drawCard(player))
  player.total = await checkTotal(player)
  return player
}

// Write a function for stay!
async function stay(dealer, user) {
  if (dealer.total < user.total && user.total < 22) {
    while (dealer.total <= 17 && dealer.total < user.total) {
      await hitMe(dealer)
      dealer.total = await checkTotal(dealer)
    }
  }
  await compare(dealer, user)
  return dealer
}


// Write a function to compare totals!
async function compare(dealer, user) {
  setTimeout(() => {
    resetBtn.classList.remove('hide')
  }, 1000)

  let dealerTotalContainer = document.querySelector('#dealer-total-container')


  if (dealer.total === user.total && dealer.total <= 21) {
    setTimeout(() => {
      endBox.innerHTML = `<h1>TIE GOES TO</h1><h1>THE HOUSE!</h1>`
    }, 1000)

  } else if (dealer.total <= 21 && dealer.total > user.total) {
    setTimeout(() => {
      endBox.innerHTML = `<h1>HOUSE WINS!</h1>`
    }, 1000)

  } else if (dealer.total > 21 && user.total <= 21) {
    setTimeout(() => {
      endBox.innerHTML = `<h1>DEALER BUST!</h1><h1>YOU WIN!</h1>`
    }, 1000)

  } else if (user.total <= 21 && dealer.total < user.total) {
    setTimeout(() => {
      endBox.innerHTML = `<h1>YOU WIN!</h1>`
    }, 1000)

  } else if (user.total > 21) {
    setTimeout(() => {
      endBox.innerHTML = `<h1>BUST! HOUSE WINS!</h1>`
    }, 1000)
  }

  endWrapper.classList.add('fade-in')
  setTimeout(() => {
    dealerTotalContainer.classList.remove('hide')
  }, 1000)
  dealerTotalContainer.innerHTML = `<p>DEALER TOTAL: ${dealer.total}</p>`
}

// Write a function to reset the board and players
async function reset(players) {
  userCardImg = document.querySelector('#user-card-container')
  dealerCardImg = document.querySelector('#dealer-card-container')
  userTotalContainer = document.querySelector('#user-total-container')
  dealerTotalContainer = document.querySelector('#dealer-total-container')
  endBox = document.querySelector('#end-container')

  userCardImg.innerHTML = ``
  dealerCardImg.innerHTML = ``
  userTotalContainer.innerHTML = ``
  userTotalContainer.classList.toggle('hide')
  dealerTotalContainer.innerHTML = ``
  dealerTotalContainer.classList.toggle('hide')
  resetBtn.classList.toggle('hide')
  endWrapper.classList.remove('fade-in')

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
  setTimeout(removeHide, 1000, dealerCardBack)
  players.dealer.total = await checkTotal(players.dealer)
  dealerCardBack.className = 'dealer-slide'
  dealerCardBack.classList.add('cardimg')
  return players
}

// End of Game Functionality!-------------------------------------------------------

// Begin Style Functionality!-------------------------------------------------------

function addHide(element) {
  element.classList.add('hide')
}

function toggleHide(element) {
  element.classList.toggle('hide')
}

function removeHide(element) {
  element.classList.remove('hide')
}

function appendSlow(element, append) {
  element.append(append)
}
