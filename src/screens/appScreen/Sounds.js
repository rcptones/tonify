import React, {Component} from 'react'
import {View, Text, TouchableOpacity, NativeModules} from 'react-native'

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

  render () {
    const {sounds} = this.state
    let counter = 0
    const soundsArray = sounds.map(sound => {
      return (
        <View
          key={sound}
          style={{
            backgroundColor: '#fff',
            marginTop: 10,
            height: 100,
            padding: 3,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text> {sound.toUpperCase()} </Text>
            <TouchableOpacity
              key={counter++}
              onPress={() => this.playSound(sound)}>
              <Text> {'Play'} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              borderTopColor: '#000',
              // borderTopWidth: 1,
              // borderWidth: 1,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              key={counter++}
              onPress={() => this.setSoundForNotification(sound)}>
              <Text
                style={{
                  backgroundColor: '#c6c6c6',
                  alignSelf: 'flex-start',
                  padding: 10,
                  borderRadius: 5,
                }}>
                {' '}
                Make this notification sound{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })

    return <View style={{padding: 10}}>{soundsArray}</View>
  }
}

export default Sounds
