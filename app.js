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
  let userTotal = []

  let card1 = drawCard(deckId, player)
  let card2 = drawCard(deckId, player)
  check()

  player = 1
  drawCard(deckId, player)
  drawCard(deckId, player)
}

// Write a function to capture the ID of a shuffled deck,
async function getId() {
  let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  try {
    const response = await axios.get(url)
    //capture and return the deck id
    const deckId = response.data.deck_id
    console.log(deckId)
    return deckId
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Write a function that deals the cards


// Write a function to draw 1 card
async function drawCard(para1, para2) {
  let url = `https://deckofcardsapi.com/api/deck/${para1}/draw/?count=1`
  try {
    const response = await axios.get(url)
    let card = response.data.cards
    console.log(card)

    userContainer = document.querySelector('#user-card-container')
    dealerContainer = document.querySelector('#dealer-card-container')

    let value = card[0].value
    const cardImg = document.createElement('img')
    cardImg.src = `${card[0].image}`

    if (para2 === 0) {
      userContainer.append(cardImg)
    } else {
      dealerContainer.append(cardImg)
    }
    return value
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Write a function that checks the value of each players cards
async function checkTotal(para1, para2) {

}

