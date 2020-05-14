import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Group UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Group');
  const content = updateContent(app.container);

  it('Group page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Group page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Group module');
  });
});
