import { createElement } from '../data/createElement.js';
import { preloader } from '../preloader/preloader.js';

const mainBody = document.querySelector('.body');

export const resetAllSettings = () => {
  const questionWrapper = createElement('div', mainBody, 'question-wrapper');
  const questionText = createElement('p', questionWrapper, 'question-text');
  questionText.textContent = 'Are you sure?';
  const questionBtnYes = createElement('button', questionWrapper, 'question-btn question-btn-yes btn btn-outline-light');
  questionBtnYes.setAttribute('type', 'button');
  questionBtnYes.textContent = 'YES';
  const questionBtnNo = createElement('button', questionWrapper, 'question-btn question-btn-no btn btn-outline-light');
  questionBtnNo.setAttribute('type', 'button');
  questionBtnNo.textContent = 'NO';
  setTimeout(() => {
    questionWrapper.classList.add('question-wrapper-on');
  }, 100);

  questionBtnYes.addEventListener('click', () => {
    const settingsWrapperOnBtn = document.querySelector('.settings-wrapper-on');
    const blackoutWrapperOnBtn = document.querySelector('.blackout-settings-on');
    questionWrapper.classList.remove('question-wrapper-on');
    settingsWrapperOnBtn.classList.remove('settings-wrapper-on');
    localStorage.removeItem('settings');
    blackoutWrapperOnBtn.classList.remove('blackout-settings-on');

    setTimeout(() => {
      location.hash = '';
      preloader();
      document.location.reload();
    }, 310)
  
    setTimeout(() => {
      questionWrapper.remove();
      settingsWrapperOnBtn.remove();
      blackoutWrapperOnBtn.remove();
    }, 1000)
  });

  questionBtnNo.addEventListener('click', () => {
    questionWrapper.classList.remove('question-wrapper-on');
    setTimeout(() => {
      questionWrapper.remove()
    }, 1000)
  })

  document.addEventListener('click', (event) => {
    const questionWrapper = document.querySelector('.question-wrapper-on')
    if ( questionWrapper && (
      event.clientX < questionWrapper.offsetLeft ||
      event.clientX > questionWrapper.offsetLeft + questionWrapper.offsetWidth ||
      event.clientY < questionWrapper.offsetTop ||
      event.clientY > questionWrapper.offsetTop + questionWrapper.offsetHeight 
    )) {
      questionWrapper.classList.remove('question-wrapper-on');
      setTimeout(() => {
        questionWrapper.remove()
      }, 1000)
    }
  })

  
}

export default resetAllSettings;