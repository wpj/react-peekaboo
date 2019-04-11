/* global page */

const BASE_URL = 'http://localhost:3000';

function getElementViewportStates() {
  return page.$$eval('[data-testid]', elements =>
    elements.map(el => el.innerHTML),
  );
}

function scrollWindow(yPixels) {
  window.scrollTo(0, yPixels);
  Promise.resolve();
}

function waitForScrollStop(debounceTime = 0) {
  const debounce = (callback, wait) => {
    let timeout;
    return (...args) => {
      const next = () => callback(...args);
      clearTimeout(timeout);
      timeout = setTimeout(next, wait);
    };
  };

  return new Promise(resolve => {
    const handleScroll = debounce(() => {
      resolve();
      window.removeEventListener('scroll', handleScroll);
    }, debounceTime);
    window.addEventListener('scroll', handleScroll);
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
        await Promise.all([
          page.evaluate(waitForScrollStop),
          page.evaluate(scrollWindow, windowHeight * 2),
        ]);

        expect(await getElementViewportStates()).toEqual([
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

        await Promise.all([
          page.evaluate(waitForScrollStop, 100),
          page.evaluate(() =>
            document.getElementById('box-9').scrollIntoView(),
          ),
        ]);

        expect(await getElementViewportStates()).toEqual([
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'hidden',
          'visible',
          'visible',
          'visible',
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

describe('When disabled', () => {
  [
    { label: 'IO', url: `${BASE_URL}/disabled?c=io` },
    { label: 'Scroll', url: `${BASE_URL}/disabled?c=scroll` },
  ].forEach(({ label, url }) => {
    describe(label, () => {
      beforeEach(async () => {
        await page.goto(url);
      });

      test(`doesn't run the visibility-check side effect`, async () => {
        expect(await getElementViewportStates()).toEqual(['hidden']);
      });
    });
  });
});
