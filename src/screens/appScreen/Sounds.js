import React, {Component} from 'react'
import {View, Text, TouchableOpacity, NativeModules, FlatList, StyleSheet} from 'react-native'

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

  setSoundForNotification = (soundName) => {
    
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


export default Sounds;

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

