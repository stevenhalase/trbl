import { TrblPage } from './app.po';

describe('trbl App', () => {
  let page: TrblPage;

  beforeEach(() => {
    page = new TrblPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
