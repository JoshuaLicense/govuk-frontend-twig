import { spawnSync } from 'node:child_process';
import * as util from 'node:util';
import nunjucks from 'nunjucks';
import * as changeCase from 'change-case';

const renderNunjucksComponent = (component: string, context: unknown) => {
  const stringContext = util.inspect(context, { compact: true, breakLength: Number.POSITIVE_INFINITY, depth: Number.POSITIVE_INFINITY });

  const env = nunjucks.configure(
    'node_modules/govuk-frontend/',
    {
      trimBlocks: true,
    },
  );

  // Overwrite `indent` filter to avoid whitespace differences in tests.
  env.addFilter('indent', (str: string) => (str));

  return env.renderString(
    `{% from "govuk/components/${component}/macro.njk" import govuk${changeCase.pascalCase(component)} %}{{ govuk${changeCase.pascalCase(component)}(${stringContext}) }}`,
    {},
  );
};

const renderTwigComponent = (component: string, context: unknown) => {
  const { stdout: twigBuffer } = spawnSync('php', [`${__dirname}/renderTwig.php`, component], { input: JSON.stringify(context) });

  return twigBuffer.toString();
};

describe.each(globalThis.components)('Nunjucks output HTML should match Twig output HTML', (componentFixture) => {
  describe.each(componentFixture.fixtures)(`${componentFixture.component}`, (fixture) => {
    it(`${fixture.name}`, () => {
      const njk = renderNunjucksComponent(componentFixture.component, fixture.options);
      const twig = renderTwigComponent(componentFixture.component, fixture.options);

      expect(twig).toEqual(njk);
    });
  });
});
