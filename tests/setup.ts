import { readdir } from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface Fixture {
  name: string;
  options: Record<string, unknown>;
}

export interface ComponentFixture {
  component: string;
  fixtures: Fixture[];
}

const getAllComponents = async () => {
  const govukPath = `${path.dirname(
    fileURLToPath(import.meta.resolve("govuk-frontend")),
  )}/components/`;
  const govukComponents = (await readdir(govukPath, { withFileTypes: true }))
    .filter((file) => file.isDirectory())
    .map((directory) => directory.name);

  return Promise.all(
    govukComponents.map(async (component) => {
      const componentFixturePath = path.resolve(govukPath, component);

      return (
        await import(`${componentFixturePath}/fixtures.json`, {
          with: { type: "json" },
        })
      ).default as ComponentFixture;
    }),
  );
};

export default async function setup(): Promise<void> {
  globalThis.components = await getAllComponents();
}
