import { type ComponentConfig } from './tests/setup';

declare global {
  declare namespace globalThis {
    var components: ComponentConfig[];
  }
}

export {};
