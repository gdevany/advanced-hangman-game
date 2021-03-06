import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import state from "./state";
// import randomWords from 'random-words';

var randomWords = require('random-words');


class App extends Component {
	constructor(){
		super();
		this.state = {
			wordToGuess:randomWords(),
			strikes:0,
			guess:"",
			correctGuesses:[]
		};
	}

  // fills correctGuesses with _'s
  fillGuesses = () => {
    if(this.state.correctGuesses.length < 1) {
      for(var i = 1; i <= this.state.wordToGuess.length; i++) {
        this.state.correctGuesses.push('_');
        // note: I can't believe it's letting me push to state!!
      }
    }
  }

  // sets this.state.guess to user guess
  guessLetter = (e) => {
    e.preventDefault();
    if(e.target.value.length < 2) {
      this.setState({
        guess: e.target.value
      });
    }
  }

  buttonClick = () => {
    // set word to the word we're guessing and console the word for cheating
    const word = this.state.wordToGuess;
    console.log(word);

    // idxs is temp array to hold INDEXES of word letter match of user guess
    const idxs = [];

    //push word letter match into idxs array
    for(var i = 0; i < word.length; i++) {
      if(word[i] === this.state.guess) {
        idxs.push(i);
      }
    }

    // call function showHit which changes the '_' with user guess in correctGuesses
    this.showHit(idxs);

    // sets this.state back to null
    this.setState({
      guess:""
    })

  };

  // changes the '_' with user guess in correctGuesses
  showHit = (idxs) => {
    if(idxs.length >= 1) {
      // temp variable so we don't effect original array of correctGuesses
      var tempCG = this.state.correctGuesses.slice(0);
      // replace each index in correctGuesses with user guess
      for(var i = 0; i < idxs.length; i++) {
        tempCG.splice(idxs[i], 1, this.state.guess);
      }
      // set State of correctGuesses with new temp array
      this.setState({
        correctGuesses: tempCG
      })
    } else {
      // if letter not found, add one to strike, only if guesser guessed
      if (this.state.guess.length > 0) {
        this.setState((prevState) => {
          return{
            strikes: prevState.strikes + 1
          }
        })
      }
    }

  };

  render() {
    this.fillGuesses();
    console.log(this.state.strikes)

    console.log(this.state.correctGuesses);

    // check for win or lose
    let className="";
    if ( this.state.correctGuesses.indexOf('_') > -1 ) {
      className= `strike-${this.state.strikes}`;
      if (this.state.strikes >= 6) className= 'gameover';
    } else className= 'gamewon';

    // map the spans (which are letters in the word) and
    // populated if the guesser guesses correctly
		let spans = this.state.correctGuesses.map((g) => {
      return  [<span>{g}  </span>];

    })

    return (
			<div>
				<div  className="hangman-sprites">
					<div className={`${className} current`} />
				</div>
				<div id="inputs" onChange={this.guessLetter}>
					<div>{spans}</div>
					<input  placeholder="guess here"
                  value={this.state.guess}
                  ref={(input) => { this.textInput = input; }}
                  autoFocus
          />
					<button onClick={this.buttonClick}>Guess</button>
				</div>
			</div>
    );
  }
}

// note: would like to fix focus issue
// note: would like to show letters guessed but were wrong

export default App;
