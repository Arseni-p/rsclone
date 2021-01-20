'use strict';
import { initApp } from '../init/initApp.js'

(function () {
  let localSettings = localStorage.getItem('settings');
  let currSettings = JSON.parse(localSettings);

  function init() {
    let gender;
    let lang;
    const initSettings = localStorage.getItem('settings');
    currSettings = JSON.parse(initSettings);

    if (currSettings) {
      gender = currSettings.gender;
      lang = currSettings.lang;
    }

    var router = new Router([
      new Route('main', `${gender}/${lang}/main.html`, true),            
      new Route('program', `${gender}/${lang}/program.html`),
      new Route('plan', `${gender}/${lang}/plan.html`)
    ]);
  }

  if (currSettings) {
    init();
  } else {
    initApp();
  }

  window.addEventListener('hashchange', () => {
    init()
  })
}());

