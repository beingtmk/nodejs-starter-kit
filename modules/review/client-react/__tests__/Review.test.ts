import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Review UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Review');
  const content = updateContent(app.container);

  it('Review page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Review page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Review module');
  });
});
