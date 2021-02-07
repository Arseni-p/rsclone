import { initSettings } from '../init/initSettings.js';

export const keysDown = (key) => {
  const keyQ = 81;
  const keyC = 67;
  const keyP = 80;
  const keyS = 83;
  const keyM = 77;
  
  if (key === keyQ) location.hash = 'main';
  if (key === keyC) location.hash = 'program';
  if (key === keyP) location.hash = 'plan';
  if (key === keyS) location.hash = 'stats';
  if (key === keyM) {
    const blackoutWrapper = document.querySelector('.blackout-settings');
    const settingsWrapper = document.querySelector('.settings-wrapper');
    const questionWrapper = document.querySelector('.question-wrapper');

    if (blackoutWrapper && settingsWrapper)  {
      blackoutWrapper.classList.remove('blackout-settings-on');
      settingsWrapper.classList.remove('settings-wrapper-on');
      if (questionWrapper) questionWrapper.classList.remove('question-wrapper-on')
      setTimeout(() => {
        blackoutWrapper.remove();
        settingsWrapper.remove();
        if (questionWrapper) questionWrapper.remove();
      }, 1000)
    } else {
      initSettings();
    }
  }
}

export default keysDown;