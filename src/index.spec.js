/* global page */

const BASE_URL = 'http://localhost:3000';

function getElementViewportStates() {
  return page.$$eval('[data-testid]', elements =>
    elements.map(el => el.innerHTML),
  );
}

// Scroll the page and return a promise that resolves when a scroll event is
// triggered.
function scrollWindow(yPixels) {
  return new Promise(resolve => {
    const handleScroll = () => {
      resolve();
      window.removeEventListener('scroll', handleScroll);
    };
    window.addEventListener('scroll', handleScroll);

    window.scrollTo(0, yPixels);
  });
}

describe('List', () => {
  [
    { label: 'IO', url: `${BASE_URL}/list?c=io` },
    { label: 'Scroll', url: `${BASE_URL}/list?c=scroll` },
  ].forEach(({ label, url }) => {
    describe(label, () => {
      beforeEach(async () => {
        await page.goto(url);
      });

      test('calculates which elements are in the viewport', async () => {
        expect(await getElementViewportStates()).toEqual([
          'visible',
          'visible',
          'visible',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
        ]);
      });

      test('recalculates which elements are in the viewport on scroll', async () => {
        const windowHeight = await page.evaluate('window.innerHeight');
        await page.evaluate(scrollWindow, windowHeight * 2);

        const result = await getElementViewportStates();

        expect(result).toEqual([
          'hidden',
          'visible',
          'visible',
          'visible',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
        ]);
      });
    });
  });
});

describe(`When a wrapped child's ref changes`, () => {
  [
    { label: 'IO', url: `${BASE_URL}/ref-swap?c=io` },
    { label: 'Scroll', url: `${BASE_URL}/ref-swap?c=scroll` },
  ].forEach(({ label, url }) => {
    describe(label, () => {
      beforeEach(async () => {
        await page.goto(url);
        await page.evaluate(scrollWindow, 1);
      });

      test('calculates which elements are in the viewport', async () => {
        expect(await getElementViewportStates()).toEqual(['visible']);
      });
    });
  });
});
