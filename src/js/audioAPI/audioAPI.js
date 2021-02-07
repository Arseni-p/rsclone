export const initAudioAPI = () => {
  const ctxAudio = new AudioContext();
  let audio;

  fetch('./assets/sounds/audioApi.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctxAudio.decodeAudioData(arrayBuffer))
    .then(decodeAudio => {
      audio = decodeAudio;
    })
  
  function playback() {
    const playSound = ctxAudio.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctxAudio.destination + 1);
    playSound.start(ctxAudio.currentTime);
    playSound.stop(ctxAudio.currentTime + 1);
  }

  window.addEventListener('mousedown', playback);
  
}

export default initAudioAPI;