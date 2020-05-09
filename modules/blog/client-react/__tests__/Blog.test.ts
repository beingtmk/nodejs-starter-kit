import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Blog UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Blog');
  const content = updateContent(app.container);

  it('Blog page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Blog page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Blog module');
  });
});
