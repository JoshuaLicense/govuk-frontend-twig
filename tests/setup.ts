import { readdir } from 'fs/promises';
import path from 'path';

export interface ComponentFixture {
  component: string,
  fixtures: {
    name: string;
    options: {
      [key: string]: unknown,
    }
  }[],
}

// During development.
const developedComponents = [
  'accordion',
  'back-link',
  'breadcrumbs',
  'button',
  'label',
  'inset-text',
  'cookie-banner',
  'details',
  'error-message',
  'error-summary',
  'fieldset',
  'header',
  'footer',
  'hint',
  'file-upload',
  'character-count',
  'textarea',
  'checkboxes',
  'date-input',
  'input',
  'notification-banner',
];

const getAllComponents = async () => {
  const govukPath = `${path.dirname(require.resolve('govuk-frontend'))}/components/`;
  const govukComponents = (await readdir(govukPath, { withFileTypes: true })).filter((file) => file.isDirectory()).map((directory) => directory.name).filter((component) => developedComponents.includes(component));

  return Promise.all(govukComponents.map(async (component) => {
    const componentFixturePath = path.resolve(govukPath, component);

    return (await import(`${componentFixturePath}/fixtures.json`)) as ComponentFixture;
  }));
};

// eslint-disable-next-line import/no-default-export
export default async function setup(): Promise<void> {
  globalThis.components = await getAllComponents();
}
