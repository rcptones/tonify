import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {SAVE_NOTIFICATION_SOUND} from '../../constants/api.constants';
import { sounds } from '../../constants/soundNames.constants';

class Sounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sounds
    };
  };

  playSound = soundName => {
    const {NotificationActivity} = NativeModules;
    NotificationActivity.playSound(soundName);
  }

  setSoundForNotification = async soundName => {
    const {token: authToken} = this.props.auth;
    const body = {
      sound: soundName,
    };

    let result = await fetch(SAVE_NOTIFICATION_SOUND, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(body),
      method: 'POST',
    });
    if (result && result.status == 202) {
      alert(`${soundName} set as you notification tone.`);
    }
  }

  CreateItem = ({id, name, fullName}) => {
    return (
      <View key={id} style={styles.card}>
        <View style={styles.cardTop}>
          <Text> {`${name}`.toUpperCase()} </Text>
          <TouchableOpacity
          onPress={() => this.playSound(name)}
          style={{
            backgroundColor: "#32CD32",
            padding: 10,
            borderRadius: 5
          }}>
            <Text style={{color: '#fff', fontSize: 16}}> {'Play'} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardBottom}>
          <TouchableOpacity onPress={() => this.setSoundForNotification(fullName)}>
            <Text style={styles.makeNotification}> Make this notification sound </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
  const {sounds} = this.state;
    return (
      <View style={{padding: 10}}>
        <FlatList
          data={sounds}
          renderItem={({item}) => this.CreateItem(item)}
          keyExtractor={(item) => `${Math.random()}`}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 100,
    padding: 5,
    borderRadius: 5,
  },
  cardTop: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardBottom: {
    // borderWidth: 1,
    flex: 1,
    borderTopColor: '#000',
    justifyContent: 'center',
  },
  makeNotification: {
    backgroundColor: '#c6c6c6',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 5,
  },
});

export default connect(mapStateToProps, {})(Sounds);
