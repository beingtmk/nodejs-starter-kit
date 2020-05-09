import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Quiz UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Quiz');
  const content = updateContent(app.container);

  it('Quiz page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Quiz page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Quiz module');
  });
});
