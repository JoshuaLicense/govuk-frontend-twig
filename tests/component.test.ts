import { spawnSync } from "node:child_process";
import nunjucks from "nunjucks";
import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";

const renderNunjucksComponent = (component: string, context: unknown) => {
  const stringContext = JSON.stringify(context, undefined, "  ");

  const env = nunjucks.configure("node_modules/govuk-frontend/dist", {
    trimBlocks: true,
  });

  // Overwrite `indent` filter to avoid whitespace differences in tests.
  env.addFilter("indent", (str: string) => str);

  const normalisedCompoenentName = upperFirst(camelCase(component));

  const njk = env.renderString(
    `{% from "govuk/components/${component}/macro.njk" import govuk${normalisedCompoenentName} %}{{ govuk${normalisedCompoenentName}(${stringContext}) }}`,
    {},
  );

  // In Twig: ' escapes to &#039. In Nunjucks: ' escapes to &#039.
  return njk.replaceAll("&#39", "&#039");
};

const renderTwigComponent = (component: string, context: unknown) => {
  const { stdout, status } = spawnSync(
    "php",
    [`${__dirname}/renderTwig.php`, component],
    { input: JSON.stringify(context) },
  );

  if (status !== 0) {
    throw new Error(stdout.toString());
  }

  // In Nunjucks: \ escapes to &#92. In Twig backslashes are not escaped.
  return stdout.toString().replaceAll("\\", "&#92;");
};

describe.each(globalThis.components)(
  "Nunjucks output HTML should match Twig output HTML",
  (componentFixture) => {
    describe.each(componentFixture.fixtures)(
      `${componentFixture.component}`,
      (fixture) => {
        it(`${fixture.name} with ${JSON.stringify(fixture.options)}`, () => {
          const njk = renderNunjucksComponent(
            componentFixture.component,
            fixture.options,
          );
          const twig = renderTwigComponent(
            componentFixture.component,
            fixture.options,
          );

          expect(twig).toEqual(njk);
        });
      },
    );
  },
);
