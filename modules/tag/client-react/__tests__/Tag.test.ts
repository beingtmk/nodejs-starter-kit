import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Tag UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Tag');
  const content = updateContent(app.container);

  it('Tag page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Tag page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Tag module');
  });
});
