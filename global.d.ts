import { type ComponentFixture } from "./tests/setup";

declare global {
  declare namespace globalThis {
    var components: ComponentFixture[];
  }
}

export {};
