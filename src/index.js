'use strict';
import { preloader } from './js/preloader/preloader.js';
import { initTheme } from './js/init/initTheme.js';


document.body.onload = () => {
  //preloader();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
})

const container = document.getElementById('app');
const navbar = document.querySelector('.navbar-nav');

function locationHashChanged( e ) {
  console.log( location.hash );
  //console.log( e.oldURL, e.newURL );
  if ( location.hash === "#score" ) {
    container.innerHTML = ''
      const docs = document.createElement('p');
      
      container.append(docs);
      docs.textContent = 'as'
  }
}

window.onhashchange = locationHashChanged;
