import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Setting UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Setting');
  const content = updateContent(app.container);

  it('Setting page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Setting page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Setting module');
  });
});
