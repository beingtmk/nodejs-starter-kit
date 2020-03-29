import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Home UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Home');
  const content = updateContent(app.container);

  it('Home page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Home page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Home module');
  });
});
