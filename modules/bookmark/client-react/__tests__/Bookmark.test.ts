import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Bookmark UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Bookmark');
  const content = updateContent(app.container);

  it('Bookmark page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Bookmark page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Bookmark module');
  });
});
