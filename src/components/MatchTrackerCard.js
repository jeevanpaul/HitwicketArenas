// Import libraries for making a component
import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';

const renderLastEvents = (match) => {
  let temp_recent_events = [null, null, null, null, null, null];
  if(typeof match.recent_events != 'undefined' && match.recent_events != null) {
		if (match.recent_events.length <= 7) {
				starting_index = 0;
				end_index = match.recent_events.length;
		} else if (match.recent_events.length <= 10) {
				starting_index = match.recent_events.length - 10 + 3;
				end_index = match.recent_events.length;
		} else {
				starting_index = 3;
				end_index = 10;
    }
    let actual_index = 0;
    for (let index = starting_index; index < end_index; index++) {
      temp_recent_events[actual_index] = match.recent_events[index];
      actual_index++;
    }
  }
  return temp_recent_events.map(event =>{
    const background_color = getBackgroundColorBasedOnEvent(event);
    return <View style={{ width: 20, height: 20,borderRadius: 10, backgroundColor: {background_color}}} />
  });
};

const getBackgroundColorBasedOnEvent = (event) => {
  if(typeof event != 'undefined' && event != null) {
    if(event == '4' || event == '6') {
      return "#307E68";
    }
    else if (event == 'XXX' || event == '#') {
      return "gray";
    }
    else if (event == 'W') { 
      return "#92151D";
    }
    else
      return "#038FC2FF";
  }
  return "white";
};

const MatchTrackerCard = (props) => {
  const {match} = props;
  let home_team_performance = "--/-";
  let home_team_overs = "0.0";
  let away_team_overs = "0.0";
  if( typeof match.home_team_performance !== 'undefined' && match.home_team_performance != null ){
    home_team_performance = match.home_team_performance;
    home_team_overs = match.home_team_overs;
  }
  let away_team_performance = "--/-";
  if( typeof match.away_team_performance != 'undefined' && match.away_team_performance != null ){
    away_team_performance = match.away_team_performance;
    away_team_overs = match.away_team_overs;
  }
  return (
    <View style={styles.mainViewStyle}>
      <ImageBackground
        source={require('./../images/match_tracker_background.jpg')}
        style={styles.mainViewStyle}
      >
            <View style={styles.scorecardViewStyle}>
                <View style={styles.TeamsViewStyle}>
                  <Text>{match.home_team_name}</Text>
                  <Text>{home_team_performance}</Text>
                  <Text>{home_team_overs}</Text>
                </View>
                <View style={styles.VersusViewStyle}>
                  <Image source={require('./../images/versus.png')} />
                </View>
                <View style={styles.TeamsViewStyle}>
                  <Text>{match.away_team_name}</Text>
                  <Text>{away_team_performance}</Text>
                  <Text>{away_team_overs}</Text>
                </View>
            </View>
            <View style={styles.Last6BallsStyle}>
              <ImageBackground
                  source={require('./../images/live_match_indication.png')}
                  style={styles.LiveMatchImageStyle}
              >
                  <Text>Live</Text>
              </ImageBackground>
              <View style={styles.CircleImageStyle}>
                {renderLastEvents(match)}
              </View>
            </View>
      </ImageBackground>
    </View>
  );
};

const styles = {
  mainViewStyle: {
    flex: 0.5,
  },
  scorecardViewStyle: {
    flexDirection: 'row',
    flex: 3
  },
  TeamsViewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2.5
  },
  VersusViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5
  },
  Last6BallsStyle: {
    flexDirection: 'row',
    flex: 1
  },
  LiveMatchImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3
  },
  CircleImageStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.7
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  }
};

// Make the component available to other parts of the app
export default MatchTrackerCard;
