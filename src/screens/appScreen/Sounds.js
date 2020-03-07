import React, {Component} from 'react'
import {View, Text, TouchableOpacity, NativeModules } from 'react-native'

class Sounds extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sounds: ['beep', 'cell', 'chime', 'digi', 'notify', 'vibe'],
    }
  }

  playSound = (soundName) => {
    const {NotificationActivity} = NativeModules;
    console.log("NativeModules", NotificationActivity);
    NotificationActivity.playSound(soundName);
  }

  render () {
    const {sounds} = this.state
    let counter = 0;
    const soundsArray = sounds.map(sound => {
      return (
        <TouchableOpacity key={counter++} onPress={() => this.playSound(sound)}>
          <View style={{backgroundColor: '#fff', padding: 10, marginTop: 10}}>
            <Text> {sound} </Text>
          </View>
        </TouchableOpacity>
      )
    })

    return <View style={{ padding: 10 }}>{soundsArray}</View>
  }
}

export default Sounds
