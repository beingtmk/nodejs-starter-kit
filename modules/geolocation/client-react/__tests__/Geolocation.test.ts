import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Geolocation UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Geolocation');
  const content = updateContent(app.container);

  it('Geolocation page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Geolocation page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Geolocation module');
  });
});
