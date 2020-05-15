import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Order UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Order');
  const content = updateContent(app.container);

  it('Order page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Order page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Order module');
  });
});
