import { createElement } from '../data/createElement.js';
import { resetAllSettings } from '../reset/resetAllSettings.js';

const mainBody = document.querySelector('.body')

export const initSettings = () => {
  const localSettings = localStorage.getItem('settings');
  const currSettings = JSON.parse(localSettings);
  const blackout = createElement('div', mainBody, 'blackout-settings');
  const settingWrapper = createElement('div', mainBody, 'settings-wrapper');
  const settingsList = createElement('ul', settingWrapper, 'settings-list')
  setTimeout(() => {
    blackout.classList.add('blackout-settings-on');
  }, 100);
  setTimeout(() => {
    settingWrapper.classList.add('settings-wrapper-on');
  }, 900);


  const settingsListArray = ['level', 'weight', 'rest', 'sound', 'language', 'reset'];
  const levelList = ['beginner', 'medium', 'advanced'];
  const soundList = ['on', 'off'];
  const langList = ['eng', 'rus', 'esp'];

  for (let i = 0; i < settingsListArray.length; i++) {
    const settingsItem = createElement('li', settingsList, 'settings-item');
    const settingsTitle = createElement('p', settingsItem, 'settings-title');
    settingsTitle.textContent = settingsListArray[i];
    const settingsInput = createElement('div', settingsItem, 'settings-input');

     if (settingsListArray[i] === 'level') {
      for (let j = 0; j < levelList.length; j++) {
        const levelInput = createElement('input', settingsInput, `level-input level-setting level-input-${levelList[j]} visually-hidden`);
        const levelLabel = createElement('label', settingsInput, `level-label level-label-${levelList[j]}`);
        levelInput.setAttribute('type', 'radio');
        levelInput.setAttribute('name', 'level');
        levelInput.setAttribute('id', `level-${levelList[j]}`);
        levelInput.setAttribute('value', `${levelList[j]}`);
        levelLabel.setAttribute('for', `level-${levelList[j]}`);
        levelLabel.textContent = levelList[j];
        levelLabel.textContent = levelList[j].slice(0, 3)
        if (levelList[j] === currSettings.level) levelInput.setAttribute('checked', 'checked');
      }
    }

    if (settingsListArray[i] === 'weight') {
      const weightInput = createElement('input', settingsInput, 'pressetings-input weight-input weight-setting settings-input');
      weightInput.setAttribute('type', 'text');
      weightInput.value = `${currSettings.weight}`;
    }

    if (settingsListArray[i] === 'rest') {
      const restInput = createElement('input', settingsInput, 'pressetings-input rest-input rest-setting settings-input');
      restInput.setAttribute('type', 'text');
      restInput.value = `${currSettings.rest}`;
    }
    
    if (settingsListArray[i] === 'sound') {
      for (let j = 0; j < soundList.length; j++) {
        const soundInput = createElement('input', settingsInput, `sound-input sound-input-${soundList[j]} visually-hidden`);
        const soundLabel = createElement('label', settingsInput, `sound-label sound-label-${soundList[j]}`);
        soundInput.setAttribute('type', 'radio');
        soundInput.setAttribute('name', 'sound');
        soundInput.setAttribute('id', `sound-${soundList[j]}`);
        soundInput.setAttribute('value', `${soundList[j]}`);
        soundLabel.setAttribute('for', `sound-${soundList[j]}`);
        soundLabel.textContent = soundList[j];
        if (soundList[j] === currSettings.sound) soundInput.setAttribute('checked', 'checked');
      }
    }
    
    if (settingsListArray[i] === 'language') {
      for (let j = 0; j < langList.length; j++) {
        const langInput = createElement('input', settingsInput, `lang-input lang-input-${langList[j]} visually-hidden`);
        const langLabel = createElement('label', settingsInput, `lang-label lang-label-${langList[j]}`);
        langInput.setAttribute('type', 'radio');
        langInput.setAttribute('name', 'lang');
        langInput.setAttribute('id', `lang-${langList[j]}`);
        langInput.setAttribute('value', `${langList[j]}`);
        langLabel.setAttribute('for', `lang-${langList[j]}`);
        langLabel.setAttribute('for', `lang-${langList[j]}`);
        langLabel.textContent = langList[j];
        if (langList[j] === currSettings.lang) langInput.setAttribute('checked', 'checked');
      }
    }

    if (settingsListArray[i] === 'reset') {
      const resetBtn = createElement('button', settingsInput, 'reset-btn btn btn-outline-light')
      resetBtn.setAttribute('type', 'button');
      resetBtn.textContent = 'reset';
    }
  }

  const settingSubmit = createElement('button', settingWrapper, 'settings-submit btn btn-outline-light');
  settingSubmit.setAttribute('type', 'button');
  settingSubmit.textContent = 'submit';


  const resetSettingsBtn = document.querySelector('.reset-btn');
  resetSettingsBtn.addEventListener('click', () => {
    resetAllSettings();
  });

  const levelsInput = document.querySelectorAll('.level-input');
  const soundsInput = document.querySelectorAll('.sound-input');
  const langInput = document.querySelectorAll('.lang-input')

  settingsList.addEventListener('click', (event) => {
    const levelRadioInput = event.target.closest('.level-label');
    const soundRadioInput = event.target.closest('.sound-label');
    const langRadioInput = event.target.closest('.lang-label');

    if (levelRadioInput) {
      levelsInput.forEach(item => {
        item.removeAttribute('checked')
      })
    };

    if (soundRadioInput) {
      soundsInput.forEach(item => {
        item.removeAttribute('checked')
      })
    };

    if (langRadioInput) {
      langInput.forEach(item => {
        item.removeAttribute('checked')
      })
    }
  });

  settingSubmit.addEventListener('click', () => {
    const regNumber = /^[0-9]+$/g;
    const levelInputs = document.querySelectorAll('.level-setting');
    const weightInput = document.querySelector('.weight-setting');
    const restInput = document.querySelector('.rest-setting');
    const soundInput = document.querySelectorAll('.sound-input');
    const langInput = document.querySelectorAll('.lang-input');
    
    levelInputs.forEach(item => {
      if (item.checked && currSettings.level !== item.value) {
        currSettings.level = item.value;
        currSettings.currDay = 1;
      };
      
    });
    if (weightInput.value.match(regNumber)) {
      currSettings.weight = weightInput.value;
      currSettings.bmi = (+(currSettings.weight) / ((+(currSettings.height) / 100) * (+(currSettings.height) / 100))).toFixed(2);
    }
    if (restInput.value.match(regNumber)) currSettings.rest = restInput.value;

    soundInput.forEach(item => {
      if (item.checked) currSettings.sound = item.value;
    });

    langInput.forEach(item => {
      if (item.checked) currSettings.lang = 'eng';
    });

    localStorage.setItem('settings', JSON.stringify(currSettings));
    blackout.classList.remove('blackout-settings-on');
      settingWrapper.classList.remove('settings-wrapper-on');
      location.hash = 'main';
      setTimeout(() => {
        blackout.remove();
        settingWrapper.remove();
      }, 1000)
  })
  
  document.addEventListener('click', (event) => {
    if (
      event.clientX < settingWrapper.offsetLeft ||
      event.clientX > settingWrapper.offsetLeft + settingWrapper.offsetWidth ||
      event.clientY < settingWrapper.offsetTop ||
      event.clientY > settingWrapper.offsetTop + settingWrapper.offsetHeight 
    ) {
      blackout.classList.remove('blackout-settings-on');
      settingWrapper.classList.remove('settings-wrapper-on');
      blackout.style.cursor = 'pointer';
      setTimeout(() => {
        blackout.remove();
        settingWrapper.remove();
      }, 1000)
    }
  })
}

export default initSettings;