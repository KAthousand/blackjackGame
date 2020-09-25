# Project Overview

## Blackjack Game

https://github.com/KAthousand/blackjackGame

## Project Description

I will be using the deck of cards API  to create a game of blackjack in which the user will play against a programmed dealer.

## API and Data Sample

https://deckofcardsapi.com/
```
{
    "success": true,
    "deck_id": "dgi0dmeyo06i",
    "cards": [
        {
            "code": "9H",
            "image": "https://deckofcardsapi.com/static/img/9H.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/9H.svg",
                "png": "https://deckofcardsapi.com/static/img/9H.png"
            },
            "value": "9",
            "suit": "HEARTS"
        },
        {
            "code": "3C",
            "image": "https://deckofcardsapi.com/static/img/3C.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/3C.svg",
                "png": "https://deckofcardsapi.com/static/img/3C.png"
            },
            "value": "3",
            "suit": "CLUBS"
        }
    ],
    "remaining": 50
}
```
<!-- Specify the API you are using and include a link. Show us a snippet of JSON returned by your API so we know you can access it and get the info you need -->

## Wireframes
[img]https://i.imgur.com/Zyac4om.png[/img]


### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 
- User able to successfully Hit and Stay
- Dealer hits on anything below soft 17. 
- Aces become a value of 1 when total cards becomes greater than 21

#### PostMVP  

- Advanced CSS. CSS animations and showing some modern personality.
- Refactor JS to make it as clean and smart as possible.
- User Begins with chips and gains or loses based on play.
- User able to bet chips.

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Sept 18-21| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|Sept 21| Project Approval | Incomplete
|Sept 22| Core Application Structure (HTML, CSS, etc.) | Incomplete
|Sept 23| MVP | Incomplete
|Sept 24| Post MVP/Styling | Incomplete
|Sept 25| Presentations | Incomplete

## Priority Matrix

[img]https://i.imgur.com/ORteoVp.png[/img]

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Basic HTML | M | 2hrs| .5hrs | .5hrs |
| Basic CSS | M | 3hrs| 2hrs | 2hrs |
| Draw Cards from API | H | 3hrs| 2rs | 2hrs|
| Appending from API to DOM | H | 2hrs| 4hrs | 4hrs |
| Hit Me Button/Function | H | 4hrs| 2hrs | 2hrs |
| Stay Button/Function | H | 4hrs| 4hrs| 4hrs |
| Dealer Reaction/Moves | H | 4hrs| 2hrs | 2hrs |
| Ending & Resetting | H | 3hrs| 5hrs | 5hrs |
| Media Query | H | 5hrs| 2hrs| 2hrs |
| Advance CSS | L | 6hrs| 8hrs | 8hrs |
| Total | H | 36hrs| 31.5hrs | 31.5hrs |

## Code Snippet

<!-- Use this section to include a brief code snippet of functionality that you are proud of and a brief description.   -->

```
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

```
The stay function had to use logic to define whether the dealer should continue to hit or not by checking the totals within a wihle loop and calling the hit me function and checking the total. the result was then compared outside the loop in which the dealer object would be returned. 

## Change Log
Originally had a reaction box where text would pop up if the user had Bust or gotten a 21 or blackjack. Had it working in javascript but stylistically it didn't seem to make sense when the compare function already tells you who won or what happened.
