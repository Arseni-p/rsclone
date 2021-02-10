export const playSound = (playItem) => {
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  let soundStatus;
  
  if (currSettings) soundStatus = currSettings.sound;
  const playSoundOn = new Audio;

  if (soundStatus === 'on') {
    console.log(`./assets/sounds/${playItem}.mp3`)
    if ( playSoundOn.canPlayType('audio/mpeg') === 'probably' ) {
      playSoundOn.src = `./assets/sounds/${playItem}.mp3`;
    }
  
    // eslint-disable-next-line no-inner-declarations
    function playSoundOnPlay() {
      playSoundOn.currentTime = 0;
      playSoundOn.play();
    }
  playSoundOnPlay();
  }
}

export default playSound;