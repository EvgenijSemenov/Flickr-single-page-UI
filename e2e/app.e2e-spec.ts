import { FlickrSinglePageUIPage } from './app.po';

describe('flickr-single-page-ui App', function() {
  let page: FlickrSinglePageUIPage;

  beforeEach(() => {
    page = new FlickrSinglePageUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
