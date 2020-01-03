import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Resources UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Resources');
  const content = updateContent(app.container);

  it('Resources page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Resources page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Resources module');
  });
});
