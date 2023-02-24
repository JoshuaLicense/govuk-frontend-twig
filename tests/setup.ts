export interface Params {
  [s: string]: string | boolean | Params;
}

export interface ComponentConfig {
  name: string;
  contexts: Params[];
}

const getContexts = async (component: string): Promise<Params[]> => {
  const path = `${__dirname}/contexts/${component}.ts`;

  try {
    const { contexts } = await import(path) as { contexts: Params[] };

    return contexts;
  } catch {
    throw new Error(`No context found for ${component} using path: ${path}.`);
  }
};

const getComponents = async (): Promise<ComponentConfig[]> => [
  {
    name: 'accordion',
    contexts: await getContexts('accordion'),
  },
  {
    name: 'back-link',
    contexts: await getContexts('back-link'),
  },
  {
    name: 'breadcrumbs',
    contexts: await getContexts('breadcrumbs'),
  },
  {
    name: 'button',
    contexts: await getContexts('button'),
  },
];

// eslint-disable-next-line import/no-default-export
export default async function setup(): Promise<void> {
  globalThis.components = await getComponents();
}
