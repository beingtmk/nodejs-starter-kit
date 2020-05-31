import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Demo UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Demo');
  const content = updateContent(app.container);

  it('Demo page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Demo page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Demo module');
  });
});
