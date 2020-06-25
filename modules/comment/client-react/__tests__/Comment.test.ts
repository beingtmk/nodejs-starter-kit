import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Comment UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Comment');
  const content = updateContent(app.container);

  it('Comment page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Comment page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Comment module');
  });
});
