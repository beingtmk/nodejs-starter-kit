import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Addresses UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Addresses');
  const content = updateContent(app.container);

  it('Addresses page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Addresses page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Addresses module');
  });
});
