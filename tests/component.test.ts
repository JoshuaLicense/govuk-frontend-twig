import * as child from 'node:child_process';
import * as util from 'node:util';
import nunjucks from 'nunjucks';
import * as changeCase from 'change-case';
import { type ComponentConfig, type Params } from './setup';

const exec = util.promisify(child.exec);

const renderNunjucksComponent = (component: ComponentConfig, context: Params) => {
  const stringContext = util.inspect(context, { compact: true, breakLength: Number.POSITIVE_INFINITY, depth: Number.POSITIVE_INFINITY });

  nunjucks.configure(
    'node_modules/govuk-frontend/',
    {
      trimBlocks: true,
    },
  );

  return nunjucks.renderString(
    `{% from "govuk/components/${component.name}/macro.njk" import govuk${changeCase.pascalCase(component.name)} %}{{ govuk${changeCase.pascalCase(component.name)}(${stringContext}) }}`,
    {},
  );
};

const renderTwigComponent = async (component: ComponentConfig, context: Params) => {
  const { stdout: twig } = await exec(`echo '${JSON.stringify(context)}' | php ${__dirname}/renderTwig.php '${component.name}.html.twig'`);

  return twig;
};

describe.each(globalThis.components)('Nunjucks output HTML should match Twig output HTML', (component) => {
  describe.each(component.contexts)(`${component.name}`, (context) => {
    it(`with context: ${JSON.stringify(context)}`, async () => {
      const njk = renderNunjucksComponent(component, context);
      const twig = await renderTwigComponent(component, context);

      expect(njk).toEqual(twig);
    });
  });
});
