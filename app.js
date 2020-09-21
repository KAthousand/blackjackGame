// Deck of Cards API
// https://deckofcardsapi.com/
// Shuffled Deck of cards api
// `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
//  Draw a card from deck using deck id
// `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`


// Capture the start button.
startBtn = document.querySelector('#start-btn')
// Add event listener to button to start running the program
startBtn.addEventListener('click', main)


// Write a main function that runs the program.
async function main() {
  let player = 0
  const deckId = await getId()
  let userHand = [
    await drawCard(deckId, player),
    await drawCard(deckId, player)
  ]
  let userTotal = await checkTotal(userHand, player)
  console.log(userTotal)

  player = 1
  let dealerHand = [
    await drawCard(deckId, player),
    await drawCard(deckId, player)
  ]
  let dealerTotal = await checkTotal(dealerHand, player)
  console.log(dealerTotal)
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


// Write a function to draw 1 card, capturing and appending the img, resetting and returning the value.
async function drawCard(para1, para2, para3) {
  let url = `https://deckofcardsapi.com/api/deck/${para1}/draw/?count=1`
  try {
    const response = await axios.get(url)
    let card = response.data.cards
    // console.log(card)

    // grab containers for user container and dealer container from html
    userContainer = document.querySelector('#user-card-container')
    dealerContainer = document.querySelector('#dealer-card-container')

    // create img element to put the card img in
    const cardImg = document.createElement('img')
    cardImg.src = `${card[0].image}`

    // append to container depending on which player is playing
    if (para2 === 0) {
      userContainer.append(cardImg)
    } else {
      dealerContainer.append(cardImg)
    }
    // get the value of the card
    let value = card[0].value
    // if the value is king queen or jack reset to 10
    if (value === 'JACK' || value === 'QUEEN' || value === 'KING') {
      value = "10"
    } else if (para3 < 21 && value === 'ACE') {
      value = "11"
    } else if (para3 > 21 && value === 'ACE') {
      value = "1"
    }
    return value
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Write a function that checks the value of each players cards
async function checkTotal(para1, para2) {

  let reactBox = document.querySelector('#reaction-container')
  let userTotalContainer = document.querySelector('#user-total-container')
  let dealerTotalContainer = document.querySelector('#dealer-total-container')

  let nums = para1.map(Number)
  let total = 0
  nums.forEach((num) => {
    total += num
  })

  if (para2 === 0) {
    userTotalContainer.innerHTML = `<p>${total}</p>`
  } else {
    dealerTotalContainer.innerHTML = `<p>${total}</p>`
  }
  if (total === 21) {
    reactBox.innerText = `<h1>Natural</h1>`
  } else if (total > 21) {
    reactBox.innerText = `<h1>Bust</h1>`
  }
  return total
}