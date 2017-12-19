// npm install react-shapes --save
// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
import React, {Component} from 'react';
// import {Rectangle} from 'react-shapes';
import './App.css';
import avatar from './daftCat.png';
import matchedAvatar from './default.png';
import {Header, Segment, Button, Popup, Grid} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      turn: 0,
      currentTurn: 1,
      profiles: [{
        shown: "",
        url: "",

      }],

    };
    this.baseState = []
    // this.turnCounter = 0;
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=12')
      .then((response) => response.json())
      .then((responseJson) => responseJson.results)
      .then(newArr => newArr.concat(newArr))
      .then(doubledArr => doubledArr.sort(() => Math.random() * 2 - 1))
      .then(results => {
        return results.map((profile) => {
          return ({
            url: profile.picture.large,
            shown: avatar,
          })
        })
      })
      .then(doubledArr => {
        this.setState({profiles: doubledArr})
        this.baseState = doubledArr
      })
  }

  handleOnClick = (data, index) => {
  // console.log(index)
    // console.log(data)
    if (this.state.currentTurn === 1) {
      const copy = [...this.state.profiles];
      //setting shown to url
      copy[index].shown = data.url;
      this.setState({profiles: copy})
      this.setState({currentTurn: 2})
      //why does baseState change???
      // console.log(this.state.profiles[index].shown)

    }
    if (this.state.currentTurn === 2 && this.state.profiles[index].shown === avatar) {
      // console.log('58')
      //shownArrs is mapping through the profiles and making an array of just
      //the shown values
      //map through and check for a match
      const shownArrs = this.state.profiles.map((profile) => profile.shown)
      this.setState({currentTurn: 1})
      //.includes finds a match in shownArr
      if (shownArrs.includes(data.url)) {
        console.log(shownArrs)
        //this is only changing the second click into the matched avatar
        const matchedCopy = [...this.state.profiles];
        matchedCopy[index].shown = matchedAvatar;
        // map through the profiles and find something that is showing
        // a picture
        this.state.profiles.map((profile) => {
          if (profile.shown !== avatar) {
            return profile.shown = matchedAvatar
          }
        })
        this.setState({profiles: matchedCopy})
        //updating the profiles state to store the new matches
        alert("match")
        this.checkForWin();
      } else {
        const copy = [...this.state.profiles];
        copy[index].shown = data.url;
        this.setState({profiles: copy})
        this.state.profiles.map((currentProfile) => {
          if (currentProfile.shown !== avatar) {
            setTimeout(function () {
              return currentProfile.shown = avatar
            }, 100)
          }
          // this.turnCounter = this.turnCounter++;
          // console.log(this.state.turn)
        })
        this.setState({currentTurn: 1})
        // console.log(this.state.currentTurn)

      }
    }
  }

  checkForWin(data) {
    let winningNum = 0
    // console.log('Is this working')
    const win = [...this.state.profiles];
    win.map((wins) => {
      if (wins.shown === matchedAvatar) {
        winningNum++;
        console.log(winningNum)
      }
      if (winningNum === win.length) {
        alert("Game Won!")
      }
    })
  }
  matchCounter() {
    let matches = 0
    const turns = [...this.state.profiles];
    turns.map((currentMatch) => {
      if (currentMatch.shown === matchedAvatar) {
         matches++;
      }
    }); return matches / 2;
  }

  renderprofiles() {
    const {profiles} = this.state;
    return (
      profiles.map((obj, key) => {
        return (
          <div key={key}>
            <img alt={avatar} src={profiles[key].shown} onClick={() =>
              this.handleOnClick(obj, key)}/>

          </div>
        )
      })
    )
  }

  gameHeader = () => (
    <Segment.Group>
      <Segment size="huge" inverted color="teal" textAlign='center' content='Welcome to the Memory Match' primary/>
    </Segment.Group>
  )
  instructionsPopUp = () => (
    <Grid.Column floated="bottom">
      <Popup
        trigger={<Button content="Instructions"/>}
        content="The object of the Memory Match is to try and match as many photos as possible."
        position="bottom"
        basic
      />
    </Grid.Column>
  )

  render() {

    return (
      <div className="ui container">
        {this.gameHeader()}
        <div className="">
          <div className="body">
            {this.renderprofiles()}
          </div>
        </div>
        <div className="popUp">
          {this.instructionsPopUp()}
        </div>
        <div>
          Match Counter: {this.matchCounter()}
        </div>
      </div>
    )
  }
}

export default App;
