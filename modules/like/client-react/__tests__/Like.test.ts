import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Like UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Like');
  const content = updateContent(app.container);

  it('Like page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Like page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Like module');
  });
});
