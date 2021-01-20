import AbstractView from './AbstractViews.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Stats')
  }

  async getHtml() {
    return `<p>Stats page<p>`
  }


}