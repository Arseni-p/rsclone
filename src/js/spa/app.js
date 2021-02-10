/* eslint-disable no-undef */

import { initApp } from '../init/initApp.js';
import { initBackground } from '../init/initTheme.js';

// eslint-disable-next-line func-names
(function () {
  const localSettings = localStorage.getItem('settings');
  let currSettings = JSON.parse(localSettings);

  function init() {
    let program;
    let lang;
    const initSettings = localStorage.getItem('settings');
    currSettings = JSON.parse(initSettings);

    if (currSettings) {
      program = currSettings.program;
      lang = currSettings.lang;
    }

    initBackground(currSettings);

    // eslint-disable-next-line no-unused-vars
    const router = new Router([
      new Route('main', `${program}/${lang}/main.html`, true),            
      new Route('program', `${program}/${lang}/program.html`),
      new Route('stats', `${program}/${lang}/stats.html`),
      new Route('plan', `${program}/${lang}/plan.html`)
    ]);
  }

  if (currSettings) {
    init();
  } else {
    initApp();
  }

  window.addEventListener('hashchange', () => {
    init();
  })
}());

