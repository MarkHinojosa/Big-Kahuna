
// npm install react-shapes --save
// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
import React, {Component} from 'react';
import {Rectangle} from 'react-shapes';
import './App.css';
import avatar  from './default.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
      urlArrayOne: [],
      urlArrayTwo: [],
      groupOne: Array(15).fill(avatar),
      groupTwo: [avatar,avatar,avatar,avatar,avatar,
                avatar,avatar,avatar,avatar,avatar,
                avatar,avatar,avatar,avatar,avatar]
    };
    this.test = [];
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  componentDidMount(){
    const that = this;
    fetch('https://randomuser.me/api/?results=15')
    .then((response) => response.json())
    .then((responseJson) => responseJson.results)
    .then(results => {
      console.log('didmount',results);
      return results.map((profile) => {
        return {
          url: profile.picture.large,
          shown: false,
        }
      })
      // that.setState({profiles: responseJson.results})
      // this.shuffleArray();
      // this.shuffleArrayTwo();
    })
    .then(newArr => newArr.concat(newArr))
    .then(doubledArr => console.log(doubledArr))
  }

  shuffleArray(arr){
    const { profiles } = this.state;
    if(profiles.length) {
        profiles.sort(() => Math.random() * 2 - 1);
        return profiles.reverse().map((obj, key) => {
          this.setState({
            urlArrayOne: [...this.state.urlArrayOne, obj.picture.large]
          })
      });
    }
  };

  shuffleArrayTwo(){
    const { profiles } = this.state;
    if(profiles.length) {
        profiles.sort(() => Math.random() * 2 - 1);
        return profiles.reverse().map((obj, key) => {
            this.setState({urlArrayTwo: [...this.state.urlArrayTwo, obj.picture
              .large]})
        })
    }
  };

  handleOnClick = (e, f) =>{
    console.log(this.test);
    const url = e.obj;
    const index = f.key;
    const tryIt =[...this.state.groupOne];
    tryIt[index] = url;
      console.log(tryIt);
    const changeIt = () =>{
      this.setState({groupOne: tryIt})
    }

    changeIt();
  }

  handleOnClickTwo = (e, f) =>{
    const url = e.obj;
    const index = f.key;
    const tryIt =[...this.state.groupTwo];
    tryIt[index] = url;
      console.log(tryIt);
    const changeIt = () =>{
      this.setState({groupTwo: tryIt})
    }

    changeIt();
  }

  renderprofiles(){
    const { urlArrayOne } = this.state;
    if(urlArrayOne.length){
      return (
        urlArrayOne.map((obj, key) =>{
          return(
            <div key={key}>
              <img src={this.state.groupOne[key]} onClick={() => this.handleOnClick({obj},{key})}/>
              {obj}{key}
            </div>
          )
        })
      )
    }
  }

  renderprofilesTwo(){
    const { urlArrayTwo } = this.state;
    if(urlArrayTwo.length){
      return (
        urlArrayTwo.map((obj, key) =>{
          return(
            <div key={key}>
              <img src={this.state.groupTwo[key]} onClick={() => this.handleOnClickTwo({obj},{key})}/>
              {obj}{key}
            </div>
          )
        })
      )
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.renderprofiles()}
        </div>
        <div>
          {this.renderprofilesTwo()}
        </div>
      </div>
    )
  }
}
export default App;
