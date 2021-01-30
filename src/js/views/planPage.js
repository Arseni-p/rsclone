import AbstractView from './AbstractViews.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Plan')
  }

  async getHtml() {
    return `<p>Plan page<p>`
  }


}