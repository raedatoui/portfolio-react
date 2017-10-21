// @flow
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

class LocalStorageMock {
  store;

  constructor() {
    this.store = {};
  }

  getItem(key: string): ?string {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
}

global.localStorage = new LocalStorageMock();
