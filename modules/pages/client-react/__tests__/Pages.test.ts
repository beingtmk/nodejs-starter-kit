import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Pages UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Pages');
  const content = updateContent(app.container);

  it('Pages page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Pages page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Pages module');
  });
});
