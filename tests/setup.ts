import { readdir } from "fs/promises";
import path from "path";

export interface ComponentFixture {
  component: string;
  fixtures: {
    name: string;
    options: Record<string, unknown>;
  }[];
}

const getAllComponents = async () => {
  const govukPath = `${path.dirname(
    import.meta.resolve("govuk-frontend"),
  )}/components/`;
  const govukComponents = (await readdir(govukPath, { withFileTypes: true }))
    .filter((file) => file.isDirectory())
    .map((directory) => directory.name);

  return Promise.all(
    govukComponents.map(async (component) => {
      const componentFixturePath = path.resolve(govukPath, component);

      return (await import(
        `${componentFixturePath}/fixtures.json`
      )) as ComponentFixture;
    }),
  );
};

export default async function setup(): Promise<void> {
  globalThis.components = await getAllComponents();
}
