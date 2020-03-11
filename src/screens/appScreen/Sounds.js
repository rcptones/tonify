import React, {Component} from 'react'
import {View, Text, TouchableOpacity, NativeModules, FlatList, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { SAVE_NOTIFICATION_SOUND } from '../../constants/api.constants';

class Sounds extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sounds: ['beep', 'cell', 'chime', 'digi', 'notify', 'vibe'],
    }
  }

  playSound = soundName => {
    const {NotificationActivity} = NativeModules
    console.log('NativeModules', NotificationActivity)
    NotificationActivity.playSound(soundName)
  }

  setSoundForNotification = async (soundName) => {
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
    console.log("result", result);

  }

  CreateItem = (sound) => {
    return (
      <View key={sound} style={styles.card}>
        <View style={styles.cardTop}>
          <Text> {`${sound}`.toUpperCase()} </Text>
          <TouchableOpacity onPress={() => this.playSound(sound)}>
            <Text> {'Play'} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardBottom}>
          <TouchableOpacity onPress={() => this.setSoundForNotification(sound)}>
            <Text style={styles.makeNotification}> Make this notification sound </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
  const {sounds} = this.state;
    return (
      <FlatList
        data={sounds}
        renderItem={({item, index}) => this.CreateItem(item, index)}
        keyExtractor={(item) => `${Math.random()}`}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Sounds);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 100,
    padding: 3,
  },
  cardTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardBottom: {
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
})

