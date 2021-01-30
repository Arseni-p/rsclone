import AbstractView from './AbstractViews.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Program')
  }

  async getHtml() {
    return `<p><a href="index.html">Program page</a></p>`
  }


}