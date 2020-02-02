import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Notifications UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Notifications');
  const content = updateContent(app.container);

  it('Notifications page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Notifications page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Notifications module');
  });
});
