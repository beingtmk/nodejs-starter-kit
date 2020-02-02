import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Events UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Events');
  const content = updateContent(app.container);

  it('Events page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Events page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Events module');
  });
});
