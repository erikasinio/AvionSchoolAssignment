"use strict";

// DOM
let displayCards = document.querySelector(".display-cards");
let shuffleCards = document.querySelector("#shuffle-cards");
let suitCards = document.querySelector("#suit");
let dealCards = document.querySelector("#deal");
let arrangeUp = document.querySelector("#value-ascending");
let arrangeDown = document.querySelector("#value-descending");
let status = document.querySelector("#status");
let dealFive = document.querySelector("#deal-five");

// VARIABLES
let suits = ["A", "K", "Q", "J", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let ranks = ["♠", "♡", "♢", "♣"];
let cards = [];

let cardRank, cardSuit;
let shuffled, deal, sortedCards;
let newCards = [];
let dealtCards = [];

// -------------------------FUNCTIONS -------------------------
// SORT TOGGLE
function sortToggle() {
  arrangeUp.classList.toggle("hidden");
  arrangeDown.classList.toggle("hidden");
}

// SHOWS DEALT CARD (PRINTED NAME)
function showDeal() {
  dealtCards.push(...[` ${cardSuit} of ${cardRank}`]);
  displayCards.textContent = dealtCards;
}

// CREATE DECK
function createDeck() {
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      cards.push(ranks[i] + "-" + suits[j]);
    }
  }
}
createDeck();

// -------------------------EVENT LISTENERS-------------------------
// SHUFFLE CARDS
shuffleCards.addEventListener("click", function () {
  newCards = cards = cards.sort(() => Math.random() - 0.5);
  displayCards.textContent =
    newCards.length !== 0
      ? newCards.toString().replaceAll("-", "")
      : "No cards left in the deck.";
  shuffled = true;
  deal = true;
});

// ARRANGE IN A SUIT
suitCards.addEventListener("click", function () {
  if (shuffled) {
    sortedCards = newCards.sort();
    displayCards.textContent =
      newCards.length !== 0
        ? sortedCards.toString().replaceAll("-", "")
        : "No cards left in the deck.";
  } else {
    displayCards.textContent = "You must shuffle the cards first.";
  }
});

// DEALS CARD - SHOWS NAME
dealCards.addEventListener("click", function () {
  if (shuffled && deal) {
    if (newCards.length !== 0) {
      let singleCard = newCards.pop();
      console.log(singleCard);
      if (singleCard.toString().includes("♠")) {
        cardRank = "Spades";
      } else if (singleCard.toString().includes("♡")) {
        cardRank = "Hearts";
      } else if (singleCard.toString().includes("♢")) {
        cardRank = "Diamonds";
      } else if (singleCard.toString().includes("♣")) {
        cardRank = "Clubs";
      }

      if (singleCard.toString().includes("A")) {
        cardSuit = "Ace";
        showDeal();
      } else if (singleCard.toString().includes("K")) {
        cardSuit = "King";
        showDeal();
      } else if (singleCard.toString().includes("Q")) {
        cardSuit = "Queen";
        showDeal();
      } else if (singleCard.toString().includes("J")) {
        cardSuit = "Jack";
        showDeal();
      } else if (singleCard.toString().includes("2")) {
        cardSuit = "Two";
        showDeal();
      } else if (singleCard.toString().includes("3")) {
        cardSuit = "Three";
        showDeal();
      } else if (singleCard.toString().includes("4")) {
        cardSuit = "Four";
        showDeal();
      } else if (singleCard.toString().includes("5")) {
        cardSuit = "Five";
        showDeal();
      } else if (singleCard.toString().includes("6")) {
        cardSuit = "Six";
        showDeal();
      } else if (singleCard.toString().includes("7")) {
        cardSuit = "Seven";
        showDeal();
      } else if (singleCard.toString().includes("8")) {
        cardSuit = "Eight";
        showDeal();
      } else if (singleCard.toString().includes("9")) {
        cardSuit = "Nine";
        showDeal();
      } else if (singleCard.toString().includes("10")) {
        cardSuit = "Ten";
        showDeal();
      }
    } else {
      status.textContent = "No cards left to deal.";
      deal = false;
    }
  } else if (!shuffled) {
    displayCards.textContent = "You must shuffle the cards first.";
  }
});

// ARRANGE CARDS IN ASCENDING ORDER
arrangeUp.addEventListener("click", function () {
  sortToggle();
  if (shuffled) {
    newCards.sort((a, b) => {
      let a_value = suits.indexOf(a.split("-")[1]);
      let b_value = suits.indexOf(b.split("-")[1]);
      if (a_value > b_value) return 1;
      else if (a_value < b_value) return -1;
      else return 0;
    });
    displayCards.textContent =
      newCards.length !== 0
        ? newCards.toString().replaceAll("-", "")
        : "No cards left in the deck.";
  } else {
    displayCards.textContent = "You must shuffle the cards first.";
  }
});

// ARRANGE CARDS IN DESCENDING ORDER
arrangeDown.addEventListener("click", function () {
  sortToggle();
  if (shuffled) {
    newCards.sort((a, b) => {
      let a_value = suits.indexOf(a.split("-")[1]);
      let b_value = suits.indexOf(b.split("-")[1]);
      if (a_value > b_value) return -1;
      else if (a_value < b_value) return 1;
      else return 0;
    });
    displayCards.textContent =
      newCards.length !== 0
        ? newCards.toString().replaceAll("-", "")
        : "No cards left in the deck.";
  } else {
    displayCards.textContent = "You must shuffle the cards first.";
  }
});

// -------------------------OTHER CODES - KEPT FOR REFERENCE -------------------------
// DEALS CARD - USING THE EXACT ARRAY (W/ SYMBOL)
// dealCards.addEventListener("click", function () {
//   if (shuffled && deal) {
//     let randomNumber = Math.floor(Math.random() * newCards.length);
//     // displayCards.textContent =
//     //   newCards.length !== 0
//     //     ? (dealtCards = dealtCards.push(...newCards.splice(randomNumber, 1)))
//     //     : "No cards left to deal.";
//     if (newCards.length !== 0) {
//       dealtCards.push(...newCards.splice(randomNumber, 1));
//       displayCards.textContent = dealtCards;
//     } else {
//       status.textContent = "No cards left to deal.";
//       deal = false;
//     }
//   } else if (!shuffled) {
//     displayCards.textContent = "You must shuffle the cards first.";
//   }
// });

// dealFive.addEventListener("click", function () {
//   let fiveCards = [];
//   for (let i = 0; i < 5; i++) {
//     fiveCards += newCards.pop();
//   }
let fiveCards = [];
let fiveCardsCol = [];
dealFive.addEventListener("click", function () {
  if (shuffled) {
    if (newCards.length > 5) {
      for (let i = 0; i < 5; i++) {
        fiveCards += newCards.pop();
        displayCards.textContent = fiveCards.toString().replaceAll("-", "");
      }
    } else {
      displayCards.textContent = `${
        newCards.length
      } left. ----- ${newCards.toString().replaceAll("-", "")}`;
      status.textContent = "Cards in deck is less than 5.";
    }
  } else {
    displayCards.textContent = "You must shuffle the cards first.";
  }
});

//   if (
//     fiveCards.split("A").length - 1 === 4 ||
//     fiveCards.split("K").length - 1 === 4 ||
//     fiveCards.split("Q").length - 1 === 4 ||
//     fiveCards.split("J").length - 1 === 4 ||
//     fiveCards.split("2").length - 1 === 4 ||
//     fiveCards.split("3").length - 1 === 4 ||
//     fiveCards.split("4").length - 1 === 4 ||
//     fiveCards.split("5").length - 1 === 4 ||
//     fiveCards.split("6").length - 1 === 4 ||
//     fiveCards.split("7").length - 1 === 4 ||
//     fiveCards.split("8").length - 1 === 4 ||
//     fiveCards.split("9").length - 1 === 4 ||
//     fiveCards.split("10").length - 1 === 4
//   ) {
//     displayCards.textContent = "Four of a kind.";
//     console.log(fiveCards);
//   }
//   console.log(fiveCards);
// });
