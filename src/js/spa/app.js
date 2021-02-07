'use strict';
import { initApp } from '../init/initApp.js';
import { initBackground } from '../init/initTheme.js';

(function () {
  let localSettings = localStorage.getItem('settings');
  let currSettings = JSON.parse(localSettings);

  function init() {
    let gender;
    let program;
    let lang;
    const initSettings = localStorage.getItem('settings');
    currSettings = JSON.parse(initSettings);

    if (currSettings) {
      gender = currSettings.gender;
      program = currSettings.program;
      lang = currSettings.lang;
    }

    initBackground(currSettings);

    var router = new Router([
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

