import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Address UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Address');
  const content = updateContent(app.container);

  it('Address page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Address page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Address module');
  });
});
