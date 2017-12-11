//Yo whats up
// npm install react-shapes --save
// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
import React, {Component} from 'react';
import {Rectangle} from 'react-shapes';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Image, Reveal } from 'semantic-ui-react';
import avatar  from './default.png';

class App extends Component {
  constructor() {
        super();
        this.state = {
            profiles: [],
            urlArray: [],
            urlArrayTwo: [],
        };
  }

  componentDidMount(){
    const that = this;
        fetch('https://randomuser.me/api/?results=15')
            .then((response) => response.json())
            .then((responseJson) => {
            that.setState({profiles: responseJson.results})
                this.shuffleArray();
                this.shuffleArrayTwo();
    })
  }

  shuffleArray(){
    const { profiles } = this.state;
    if(profiles.length) {
        profiles.sort(() => Math.random() * 2 - 1);
        return profiles.reverse().map((obj, key) => {
            this.setState({urlArray: [...this.state.urlArray, obj.picture.large]})
        });
    }
  };

  shuffleArrayTwo(){
    const { profiles } = this.state;
    if(profiles.length) {
        profiles.sort(() => Math.random() * 2 - 1);
        return profiles.reverse().map((obj, key) => {
            this.setState({urlArrayTwo: [...this.state.urlArrayTwo, obj.picture.large]})
        })
    }
  };

  renderprofiles(){
    const { urlArray } = this.state;
    const { urlArrayTwo } = this.state;
    if(urlArray.length){
      return (

        urlArray.map((obj, key) =>{
          return(
            <div key={key}>
              <Reveal animated='move up'>
                <Reveal.Content visible>
                  <Image size="small" src={avatar}/>
                </Reveal.Content>
                <Reveal.Content hidden>
                  <Image size="small" src={obj} />
                </Reveal.Content>
              </Reveal>
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
                <Reveal animated='move up'>
                  <Reveal.Content visible>
                    <Image size="small" src={avatar}/>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Image size="small" src={obj}/>
                  </Reveal.Content>
                </Reveal>
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
