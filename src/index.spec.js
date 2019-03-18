/* global page */

const BASE_URL = 'http://localhost:3000';

function getElementViewportStates() {
  return page.$$eval('[data-testid]', elements =>
    elements.map(el => el.innerHTML),
  );
}

[
  { label: 'IO', url: `${BASE_URL}/io` },
  { label: 'Scroll', url: `${BASE_URL}/scroll` },
].forEach(({ label, url }) => {
  describe(label, () => {
    beforeEach(async () => {
      page.setViewport({
        height: 600,
        width: 300,
      });
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
      // scroll the page and wait to receive a scroll event before proceeding
      await page.evaluate(
        () =>
          new Promise(resolve => {
            const handleScroll = () => {
              resolve();
              window.removeEventListener('scroll', handleScroll);
            };
            window.addEventListener('scroll', handleScroll);

            window.scrollTo(0, window.innerHeight * 2);
          }),
      );

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
