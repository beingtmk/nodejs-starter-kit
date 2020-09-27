import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Faq UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Faq');
  const content = updateContent(app.container);

  it('Faq page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Faq page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Faq module');
  });
});
