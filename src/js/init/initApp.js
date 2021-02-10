
import { initBackground } from './initTheme.js';

const settings = {
  'gender': '',
  'lang': 'eng',
  'weight': '',
  'height': '',
  'program': 'plank',
  'level': '',
  'sound': 'on',
  'bmi': '',
  'theme': 'dark',
  'currDay': '1',
  'rest': '',
  'workoutsTotal': '0',
  'kkalTotal': '0',
  'durTotal': '0',
  'mainBg': 'image-1.jpg',
  'bestRecord': 'no records',
  'bestTimer': 'no best timer',
}

export const initApp = () => {
  let checked = false;
  let presettingsCount = 0;
  let currItem = 1;
  const blackout = document.querySelector('.blackout');
  const blackoutOpacity = document.querySelector('.blackout-opacity');
  let opacityValue = 1;
  const opacityGradation = 0.2;
  const presettingsWrapper = document.querySelector('.presettings-wrapper'); 
  const presettingsTitles = document.querySelectorAll('.presettings-title');
  const presettingsBtn = document.querySelectorAll('.presettings-btn');
  const presettingsItem = document.querySelectorAll('.presettings-item');
  const backBtn = document.querySelector('.back');  const genderContent = document.querySelector('.gender-content');
  const relaxContent = document.querySelector('.relax-choice');
  const levelContent = document.querySelector('.level-choice');
  const genderArr = document.querySelectorAll('.gender-btn');
  const relaxArr = document.querySelectorAll('.relax-input');
  const levelArr = document.querySelectorAll('.level-input');
  const weightInput = document.querySelector('.weight-input');
  const heightInput = document.querySelector('.height-input');
  const presettingsWidth = 280;
  const buttonsArray = ['check-gender', 'check-weight', 'check-height', 'check-relax', 'check-start']
  let leftMove = 0;
  const presettingsList = document.querySelector('.presettings-list');
  const regNumber = /^[0-9]+$/g;

  blackout.classList.add('blackout-on');

  genderContent.addEventListener('click', () => {
    genderArr.forEach(item => { 
      if (item.checked) {
        settings.gender = item.value;
        checked = true;
      } 
    })
  });

  relaxContent.addEventListener('click', () => {
    relaxArr.forEach(item => { 
      if (item.checked) {
        settings.rest = item.value;
        checked = true;
      } 
    })
  });

  levelContent.addEventListener('click', () => {
    levelArr.forEach(item => { 
      if (item.checked) {
        settings.level = item.value;
        checked = true;
      } 
    })
  });

  const opacityOn = () => {
    opacityValue -= opacityGradation;
    blackoutOpacity.style.opacity = opacityValue;
    return opacityValue;
  }

  const opacityOff = () => {
    opacityValue += opacityGradation;
    blackoutOpacity.style.opacity = opacityValue;
    return opacityValue;
  }

  backBtn.addEventListener('click', () => {
    presettingsTitles.forEach(item => { item.classList.remove('wrong-item') });
    presettingsBtn.forEach(item => { item.classList.remove('wrong-btn') });
    presettingsCount--;
    if (presettingsCount <= 0) {
      presettingsCount = 0;
      backBtn.style.display = 'none';
    }
    leftMove = presettingsWidth * -(presettingsCount);
    presettingsItem[presettingsCount].classList.remove('checked-item');
    presettingsList.style.left = `${leftMove}px`;
    checked = true;
    currItem--;
    opacityOff()
  })

  presettingsList.addEventListener('click', (event) => {
    const presettingsBtnNext = event.target.classList.contains(`${buttonsArray[presettingsCount]}`);
    const checkStart = event.target.classList.contains(`${buttonsArray[buttonsArray.length - 1]}`)
    const checkWeight = event.target.classList.contains('check-weight');
    const checkHeight = event.target.classList.contains('check-height');

    if ( checkWeight && weightInput.value.match(regNumber) && weightInput.value > 0 ) {
      settings.weight = weightInput.value;
      checked = true;
    }

    if ( checkHeight && heightInput.value.match(regNumber) && heightInput.value > 0 ) {
      settings.height = heightInput.value;
      settings.bmi = (+settings.weight / ((+settings.height/100) * (+settings.height/100))).toFixed(2);
      checked = true;
    }

    if (checkWeight && !weightInput.value.match(regNumber) || checkHeight && !heightInput.value.match(regNumber)) {
      checked = false;
    }

    if (presettingsBtnNext && !checked) {
      presettingsTitles.forEach(item => {item.classList.add('wrong-item')});
      presettingsBtn.forEach(item => {
        item.classList.add('wrong-btn-shadow');
        item.classList.add('wrong-btn');
      });
      setTimeout(() => {
        presettingsBtn.forEach(item => {
          item.classList.remove('wrong-btn-shadow');
        })
      }, 1000);
    };

    if (presettingsBtnNext && checked && presettingsCount < buttonsArray.length - 1) {
      presettingsTitles.forEach(item => { item.classList.remove('wrong-item')});
      presettingsBtn.forEach(item => {
        item.classList.remove('wrong-btn-shadow');
        item.classList.remove('wrong-btn');
      });
      presettingsItem[presettingsCount].classList.add('checked-item');
      presettingsCount++;
      leftMove = presettingsWidth * -(presettingsCount);
      presettingsList.style.left = `${leftMove}px`;
      checked = false;
      currItem++;
      opacityOn();
      if (currItem === 5) {
        initBackground(settings);
      }
    } 

    if (checkStart && checked) {
      presettingsWrapper.classList.add('presettings-wrapper-off');
      blackout.classList.add('blackout-move');
      setTimeout(() => {
        blackout.classList.remove('blackout-on');
      }, 1500);
      localStorage.setItem('settings', JSON.stringify(settings));
      document.location.href = '#main'
    }

    if (presettingsCount > 0) {backBtn.style.display = 'block'};

  })

  const enterKey = 13;
  window.addEventListener("keydown", (event) => {
    if (currItem === 2 && weightInput.value.match(regNumber) && weightInput.value > 0) {
      settings.weight = weightInput.value;
      checked = true;
    }

    if (currItem === 3 && heightInput.value.match(regNumber) && heightInput.value > 0) {
      settings.height = heightInput.value;
      settings.bmi = (+settings.weight / ((+settings.height/100) * (+settings.height/100))).toFixed(2);
      checked = true;
    }

    if (currItem === 2 && !weightInput.value.match(regNumber) || currItem === 3 && !heightInput.value.match(regNumber)) {
      checked = false;
    }

    if (event.keyCode === enterKey && !checked) {
      presettingsTitles.forEach(item => {item.classList.add('wrong-item')});
      presettingsBtn.forEach(item => {
        item.classList.add('wrong-btn-shadow');
        item.classList.add('wrong-btn');
      });
      setTimeout(() => {
        presettingsBtn.forEach(item => {
          item.classList.remove('wrong-btn-shadow');
        })
      }, 1000);
    }

    if (event.keyCode === enterKey && checked && presettingsCount < buttonsArray.length - 1) {
      presettingsTitles.forEach(item => { item.classList.remove('wrong-item')});
      presettingsBtn.forEach(item => {
        item.classList.remove('wrong-btn-shadow');
        item.classList.remove('wrong-btn');
      });
      presettingsItem[presettingsCount].classList.add('checked-item');
      presettingsCount++;
      leftMove = presettingsWidth * -(presettingsCount);
      presettingsList.style.left = `${leftMove}px`;
      checked = false;
      currItem++;
      opacityOn();
    }

    if (event.keyCode === enterKey && checked && currItem === buttonsArray.length) {
      presettingsWrapper.classList.add('presettings-wrapper-off');
      blackout.classList.add('blackout-move');
      setTimeout(() => {
        blackout.classList.remove('blackout-on');
      }, 1500);
      localStorage.setItem('settings', JSON.stringify(settings));
      document.location.href = '#main'
    }
  })


}

export default initApp;