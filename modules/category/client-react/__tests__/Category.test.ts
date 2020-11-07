import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Category UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Category');
  const content = updateContent(app.container);

  it('Category page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Category page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Category module');
  });
});
