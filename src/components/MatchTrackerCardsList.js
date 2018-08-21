import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import axios from 'axios';
import MatchTrackerCard from './MatchTrackerCard';

class MatchTrackerCardsList extends Component {
  state = { matches: [], timeinterval: null };

   callTheApiAndUpdateState() {
     axios.get('https://hitwicket.com/apiThree/match/unityMatchTrackersData?auth_token=66322c880abc6c1b79c19cef39e969a66e24ca2f&device_type=UNITY_LinuxEditor&app_version=7250')
       .then(response => {
         console.log(response);
         this.setState({ matches: response.data.matches, timeinterval: this.state.timeinterval })
       });  
   }

  componentWillMount() {
    this.callTheApiAndUpdateState();
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.state.timeinterval = setInterval(this.callTheApiAndUpdateState.bind(), 5000);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearInterval(this.state.timeinterval);
  }

  renderMatchTrackerCards() {
    return this.state.matches.map(match =>
      <MatchTrackerCard key={match.id} match={match} />
    );
  }

  render() {
    console.log(this.state);
    console.log("enetered");
    if(this.state.matches.length > 0) {
        return (
            <ScrollView>
              {this.renderMatchTrackerCards()}
            </ScrollView>
          );
    }
    return (
        <Text>
          Currently there are no matches
        </Text>
      );
  }
}

export default MatchTrackerCardsList;