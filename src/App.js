import React, { Component } from 'react';
import axios from 'axios';
import Button from './Button';
import YesOrQuestionImage from './YesOrQuestionImage';
import Sound from 'react-sound'  

//Credits: Pokémon and Pokémon character names are trademarks of Nintendo.


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      loading: 0,
      nameButton2: [0],
      nameButton3: [0],
      nameButton4: [0],
      isRight: `question`,
      showAnswer: false,
      orderButton1: 0,
      orderButton2: 0,
      orderButton3: 0,
      orderButton4: 0,
    };
  }

  componentDidMount() {
    //random number generator
    const randomNum = (number) => {
      return Math.floor(Math.random() * number + 1);
    };

    //assign different random numbers to each button so the order of the buttons changes every time the page loads
    let but1 = randomNum(4);

    let but2 = randomNum(4);
    while (but2 === but1) {
      but2 = randomNum(4);
    }

    let but3 = randomNum(4);
    while (but3 === but2 || but3 === but1) {
      but3 = randomNum(4);
    }

    let but4 = randomNum(4);
    while (but4 === but3 || but4 === but2 || but4 === but1) {
      but4 = randomNum(4);
    }

    this.setState({
      orderButton1: but1,
      orderButton2: but2,
      orderButton3: but3,
      orderButton4: but4,
    });

    //load 150 pokemon names from the PokeAPI
    axios({
      url: `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`,
      method: `GET`,
    }).then((response) => {
      const myArray = response.data.results;
      //create a new array and push 150 pokemon names in that array
      const pokeNames = ['Loading...'];
      for (let i = 0; i < myArray.length; i++) {
        pokeNames.push(myArray[i].name);
      }
      //copy the 150 name array to state 
      this.setState({
        names: pokeNames,
      });

      //when the page is rendered wait for 0.8s to show random pokemon names in the buttons 
      setTimeout(() => {
        this.setState({
          //correct answer
          loading: randomNum(150),
          //wrong answers
          nameButton2: randomNum(150),
          nameButton3: randomNum(150),
          nameButton4: randomNum(150),
        });
      }, 800);
    });
  }

  //if the answer is correct, render a green check mark instead of the question mark
  showYesSign = () => {
    this.setState({
      isRight: `yes`,
      showAnswer: !this.state.showAnswer,
    });
  };
  
  //if the answer is wrong, render a red cross instead of the question mark
  showNoSign = () => {
    console.log('no is hit');
    this.setState({
      isRight: `no`,
      showAnswer: !this.state.showAnswer,
    });
  };

  render() {
    return (
      <div className='outer--wrapper'>
        <div className='inner-wrapper'>
          <div className='pokemon--box'>
            <img
              className='animated zoomIn'
              src={require(`./artwork/${this.state.loading}.png`)}
              alt=''
            />
          </div>

          <div className='question--box'>
            <YesOrQuestionImage rightAnswer={this.state.isRight} />
          </div>

          <div
            className={
              // when user clicks on any button the state "showAnswer" updates to TRUE and a cloud with a correct name appears
              this.state.showAnswer
                ? 'answerCloud answerVisible animated bounceIn'
                : 'answerCloud'
            }
          >
            <img src={require(`./images/cloud.png`)} alt='' />
            <p>
              it's
              <br />
              {/* //correct pokemon name: */}
              {this.state.names[this.state.loading]}
            </p>
          </div>

          <div className='options--box'>
            <Button
              view={this.showYesSign}
              // this button always contains the right answer. Others - wrong
              isCorrectAnswer={true}
              //display a name (correct one)
              loadName={this.state.names[this.state.loading]}
              order={this.state.orderButton1}
            />
            <Button
              view={this.showNoSign}
              isCorrectAnswer={false}
              //display a name (random wrong one)
              loadName={this.state.names[this.state.nameButton2]}
              order={this.state.orderButton2}
            />
            <Button
              view={this.showNoSign}
              isCorrectAnswer={false}
              //display a name (random wrong one)
              loadName={this.state.names[this.state.nameButton3]}
              order={this.state.orderButton3}
            />
            <Button
              view={this.showNoSign}
              isCorrectAnswer={false}
              //display a name (random wrong one)
              loadName={this.state.names[this.state.nameButton4]}
              order={this.state.orderButton4}
            />
          </div>
        </div>
        <div className='logo--box'>
          <img src={require('./images/logo.png')} alt='' />
        </div>

        {/* play sound on page load/re-load */}
        <Sound
          url='https://nikitaguliaev.com/WTP.mp3'
          playStatus={Sound.status.PLAYING}
        />
      </div>
    );
  }
}

export default App;
