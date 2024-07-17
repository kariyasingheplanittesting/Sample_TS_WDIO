/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/return-await */
const defaultSearchTimeout = 240000;
export async function scrollDownUntil<T>(
  search: () => Promise<T>,
  searchTimeout = defaultSearchTimeout
): Promise<T> {
  const start: { x: number; y: number } = {
    x: (1 / 20) * (await browser.getWindowSize()).width,
    y: (3 / 5) * (await browser.getWindowSize()).height
  };
  const end: { x: number; y: number } = {
    x: (1 / 20) * (await browser.getWindowSize()).width,
    y: (2 / 5) * (await browser.getWindowSize()).height
  };
  return await until(search, start, end, searchTimeout);
}

export async function scrollUpUntil<T>(
  search: () => Promise<T>,
  searchTimeout = defaultSearchTimeout
): Promise<T> {
  const start: { x: number; y: number } = {
    x: (1 / 2) * (await browser.getWindowSize()).width,
    y: (1 / 3) * (await browser.getWindowSize()).height
  };
  const end: { x: number; y: number } = {
    x: (1 / 2) * (await browser.getWindowSize()).width,
    y: (3 / 4) * (await browser.getWindowSize()).height
  };
  return await until(search, start, end, searchTimeout);
}

export async function scrollRightFromLocationUntil<T>(
  location: { x: number; y: number; width: number; height: number },
  search: () => Promise<T>,
  searchTimeout = defaultSearchTimeout
): Promise<T> {
  const start: { x: number; y: number } = {
    x: (3 / 4) * (await browser.getWindowSize()).width,
    y: location.y + (1 / 2) * location.height
  };
  const end: { x: number; y: number } = {
    x: (1 / 3) * (await browser.getWindowSize()).width,
    y: location.y + (1 / 2) * location.height
  };
  return await until(search, start, end, searchTimeout);
}

export async function scrollLeftFromLocationUntil<T>(
  location: { x: number; y: number; width: number; height: number },
  search: () => Promise<T>,
  searchTimeout = defaultSearchTimeout
): Promise<T> {
  const start: { x: number; y: number } = {
    x: (1 / 3) * (await browser.getWindowSize()).width,
    y: location.y + (1 / 2) * location.height
  };
  const end: { x: number; y: number } = {
    x: (3 / 4) * (await browser.getWindowSize()).width,
    y: location.y + (1 / 2) * location.height
  };
  return await until(search, start, end, searchTimeout);
}

async function until<T>(
  search: () => Promise<T>,
  start: { x: number; y: number },
  end: { x: number; y: number },
  searchTimeout = 240000
): Promise<T> {
  let retVal: T = null;
  await browser.waitUntil(
    async () => {
      await scroll(start, end);
      try {
        retVal = await search();
        if (typeof retVal === 'undefined' || retVal === null) {
          return await scroll(start, end);
        }
      } catch {
        return await scroll(start, end);
      }
      return true;
    },
    {
      timeout: searchTimeout,
      interval: 100,
      timeoutMsg: `scroll search gave up after ${searchTimeout} milliseconds`
    }
  );
  return retVal;
}

async function scroll(start: { x: number; y: number }, end: { x: number; y: number }) {
  await browser.touchAction([
    { action: 'press', x: start.x, y: start.y },
    { action: 'wait', ms: 500 },
    { action: 'moveTo', x: end.x, y: end.y },
    { action: 'release' }
  ]);
  return false;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace WebdriverIO {
    interface Browser {
      scrollDownUntil: typeof scrollDownUntil;
      scrollUpUntil: typeof scrollUpUntil;
      scrollRightFromLocationUntil: typeof scrollRightFromLocationUntil;
      scrollLeftFromLocationUntil: typeof scrollLeftFromLocationUntil;
    }
  }
}
