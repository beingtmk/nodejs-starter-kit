import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Listing UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Listing');
  const content = updateContent(app.container);

  it('Listing page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Listing page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Listing module');
  });
});
