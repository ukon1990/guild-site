import { GuildSitePage } from './app.po';

describe('guild-site App', () => {
  let page: GuildSitePage;

  beforeEach(() => {
    page = new GuildSitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
