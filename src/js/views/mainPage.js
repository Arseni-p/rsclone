import AbstractView from './AbstractViews.js';
import createElement from './createElement.js';
import {container} from '../data/appData.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Main page')
  }

  async getHtml() {
    return `<h1>workout</h1>`;
  }


}