export class LocalStorageService {
    static mainKey = 'ddiscounthero';

    static setItem(path:string, value) {
      if (typeof window !== 'undefined') {
        try {
          const existingItem = JSON.parse(window.localStorage.getItem(`${LocalStorageService.mainKey}.${path}`));
          const combinedValue = !existingItem ? JSON.stringify(value) : JSON.stringify(Object.assign({}, existingItem, value));
          window.localStorage.setItem(`${LocalStorageService.mainKey}.${path}`, combinedValue);
        } catch (e) {
          console.error(e);
        }
      }
    }

    static getItem(path:string) {
      if (typeof window !== 'undefined') {
        try {
          return JSON.parse(window.localStorage.getItem(`${LocalStorageService.mainKey}.${path}`));
        } catch (e) {
          console.error(e);
        }
      }
      return null;
    }

    static clearItem(path:string) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(`${LocalStorageService.mainKey}.${path}`, null);
      }
    }
  }
