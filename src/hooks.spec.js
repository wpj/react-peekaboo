/* global page */

const BASE_URL = 'http://localhost:3000';

function getElementIntersectionStates() {
  return page.$$eval('[data-testid]', elements =>
    elements.map(el => el.innerHTML),
  );
}

function scrollWindow({ x = 0, y = 0 }) {
  window.scrollTo(x, y);
  Promise.resolve();
}

function waitForIdleCallback() {
  return new Promise(resolve => {
    requestIdleCallback(resolve);
  });
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
    { component: 'io', direction: 'vertical', url: `${BASE_URL}/list` },
    { component: 'io', direction: 'horizontal', url: `${BASE_URL}/list` },
    { component: 'scroll', direction: 'vertical', url: `${BASE_URL}/list` },
    { component: 'scroll', direction: 'horizontal', url: `${BASE_URL}/list` },
  ].forEach(({ component, direction, url }) => {
    describe(`${component} - ${direction}`, () => {
      beforeEach(async () => {
        await page.goto(`${url}?c=${component}&direction=${direction}`);
      });

      test('calculates which elements are intersecting', async () => {
        await page.evaluate(waitForIdleCallback);
        expect(await getElementIntersectionStates()).toEqual([
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

      test('recalculates which elements are intersecting on scroll', async () => {
        const viewportHeight = await page.evaluate('window.innerHeight');
        const viewportWidth = await page.evaluate('window.innerWidth');
        await Promise.all([
          page.evaluate(waitForScrollStop),
          page.evaluate(
            scrollWindow,
            direction === 'vertical'
              ? { y: viewportHeight * 2 }
              : { x: viewportWidth * 2 },
          ),
        ]);

        await page.evaluate(waitForIdleCallback);
        expect(await getElementIntersectionStates()).toEqual([
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

        await page.evaluate(waitForIdleCallback);
        expect(await getElementIntersectionStates()).toEqual([
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
        await page.evaluate(waitForIdleCallback);
        expect(await getElementIntersectionStates()).toEqual(['hidden']);
      });
    });
  });
});
