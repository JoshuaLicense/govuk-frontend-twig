import { type ComponentFixture } from "./tests/setup";

declare global {
  namespace globalThis {
    var components: ComponentFixture[];
  }
}

export {};
