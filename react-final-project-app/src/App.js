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
      currentTurn: 1,
      profiles: [{
        shown: "",
        url: "",

      }],

    };
    this.baseState = []
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

    if (this.state.currentTurn === 1) {

      const copy = [...this.state.profiles];
      copy[index].shown = data.url;
      this.setState({profiles: copy})
      this.setState({currentTurn: 2})
      //why does baseState change???
      console.log(this.state.profiles[index].shown)
      console.log(this.state.currentTurn)

    }
    if (this.state.currentTurn === 2 && this.state.profiles[index].shown === avatar) {
      console.log('58')
      //shownArrs is mapping through the profiles and making an array of just
      //the shown values
      const shownArrs = this.state.profiles.map((profile) => profile.shown)
      this.setState({currentTurn: 1})
      if (shownArrs.includes(data.url)) {
        //if the new clicked is found in the shownArrs
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
        })
        this.setState({currentTurn: 1})

      }
    }
  }

  checkForWin(data) {
    let winningNum = 0
    console.log('Is this working')

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


  renderAlert() {
    return (

      <div>
        <h1> {"not a match"} </h1>
      </div>
    )
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
      content="Try to match as many photos as you can."
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
      </div>
    )
  }
}

export default App;
