// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
    let score = 0;
	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            score += pointValue
		 }
 
	  }
	}
	return score;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
    console.log("Let's play some scrabble! Enter a word:");
    let userInput = input.question("Enter a word to score: ");
    return userInput;
 };

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
    word = word.toUpperCase();
    let letterPoints = "";
    let score = 0;
	for (let i = 0; i < word.length; i++) {
        letterPoints += `Points for '${word[i]}': 1\n`
        score += 1
	}
    
	return score;

};

let vowelBonusScorer = function (word) {
    vowels = ["A", "E", "I", "O", "U"];
    word = word.toUpperCase();
    let letterPoints = "";
    let score = 0;
    for (let i = 0; i < word.length; i++) {
        if (vowels.indexOf(word[i]) != -1) {
            letterPoints += `Points for '${word[i]}': 3\n`
            score += 3
        } else {
            letterPoints += `Points for '${word[i]}': 1\n`
            score += 1
        }
    }
    return score;
};

let scrabbleScorer = function(word) {
    let score = 0;
  
    for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i].toLowerCase()];
    }
  
    return score;
  };




const scoringAlgorithms = [
    {"name": "Simple Scorer", "description": "Each letter is worth 1 point.", "scorerFunction": simpleScorer},
    {"name": "Vowel Bonus Scorer", "description": "Each consonant is worth 1 point and vowels are worth 3 points.", "scorerFunction": vowelBonusScorer},
    {"name": "Scrabble Scorer", "description": "Original scorer based on the game Scrabble", "scorerFunction": scrabbleScorer}
];

function scorerPrompt(word) {
    console.log("How would you like to your word to be scored?\n\n0) Simple Scorer\n1) Vowel Bonus Scorer\n2) Original Scrable Scorer\n");
    let scorerSelection = input.question("Enter your selection (0, 1, or 2): ");
    return console.log(scoringAlgorithms[scorerSelection].scorerFunction(word));
}

function transform(oldPointStructure) {
    let newPointStructure = {};
    
    for (let pointValue in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
        let letter = oldPointStructure[pointValue][i].toString();
        newPointStructure[letter.toLowerCase()] = Number(pointValue);
        newPointStructure[letter.toUpperCase()] = Number(pointValue);
      }
    }
    
    return newPointStructure;
}
console.log(transform(oldPointStructure));

function runProgram() {
    userInput = initialPrompt();
    scorerPrompt(userInput);
}




// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};