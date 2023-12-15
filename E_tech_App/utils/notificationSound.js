import { Audio } from 'expo-av'

class SoundPlayer {
  constructor() {
    this.soundObject = new Audio.Sound()
  }

  async playSound() {
    try {
      await this.soundObject.unloadAsync() 
      await this.soundObject.loadAsync(require('../assets/notification-sound.mp3'))
      await this.soundObject.playAsync()
    } catch (error) {
      console.error('Không thể phát âm thanh', error)
    }
  }

  async stopSound() {
    try {
      await this.soundObject.stopAsync()
    } catch (error) {
      console.error('Không thể dừng âm thanh', error)
    }
  }
}

export default new SoundPlayer()
