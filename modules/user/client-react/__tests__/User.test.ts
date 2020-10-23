// General imports
import { expect } from 'chai';

// Components and helpers
import { Renderer, updateContent, waitForElementRender } from '@gqlapp/testing-client-react';
import { default as USER_ROUTES } from '../routes';

const mocks = {
  Query: () => ({
    currentUser() {
      return {
        id: 1,
        username: 'user',
        role: 'user',
        isActive: true,
        email: 'user@example.com',
        profile: null,
        auth: null,
        __typename: 'User'
      } as any;
    }
  })
};

describe('User UI works', () => {
  const renderer = new Renderer(mocks, {});
  let app;
  let content;

  it('User page renders on mount', async () => {
    app = renderer.mount();
    renderer.history.push(`${USER_ROUTES.profile}`);
    await waitForElementRender(app.container, `a[href="${USER_ROUTES.profile}"]`);
    content = updateContent(app.container);
    // tslint:disable-next-line:no-unused-expression
    expect(content).to.not.be.empty;
  });
});
