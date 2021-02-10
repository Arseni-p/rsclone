/* eslint-disable no-restricted-globals */
import { initSettings } from '../init/initSettings.js';

export const keysDown = (key) => {
  const keyQ = 81;
  const keyW = 87;
  const keyE = 69;
  const keyR = 82;
  const keyT = 84;
  
  if (key === keyQ) location.hash = 'main';
  if (key === keyW) location.hash = 'program';
  if (key === keyE) location.hash = 'plan';
  if (key === keyR) location.hash = 'stats';
  if (key === keyT) {
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