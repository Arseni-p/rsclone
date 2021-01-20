'use strict';
import { preloader } from './js/preloader/preloader.js';
import { initApp } from './js/init/initApp.js';


document.body.onload = () => {
  preloader();
}

document.addEventListener('DOMContentLoaded', () => {
  //initApp();
})

const container = document.getElementById('app');
const navbar = document.querySelector('.navbar-nav');

function locationHashChanged( e ) {
  console.log( location.hash );
  console.log( e.oldURL, e.newURL );
  if ( location.hash === "#program" ) {
    container.innerHTML = ''
      const docs = document.createElement('p');
      
      container.append(docs);
      docs.textContent = 'as'
  }
}

window.onhashchange = locationHashChanged;
