# GitHub Copilot Instructions

This document provides guidance for AI agents working on this repository.

## Repository Overview

This repository maintains Twig equivalents of the [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) Nunjucks component templates. The goal is to keep the Twig templates in `src/templates/components/` in sync with the upstream Nunjucks templates in `govuk-frontend`.

## Upgrading govuk-frontend

### Step 1: Check the latest version

```bash
npm show govuk-frontend version
```

### Step 2: Install the new version

```bash
npm install govuk-frontend@latest
```

This updates both `package.json` (the `devDependencies["govuk-frontend"]` version constraint) and `package-lock.json`.

### Step 3: Install PHP dependencies (if not already installed)

```bash
COMPOSER_HOME=/tmp/composer composer install --no-interaction
```

Note: Standard `composer install` may hang waiting for input. Use `--no-interaction` or `COMPOSER_HOME=/tmp/composer` to avoid this.

### Step 4: Run the tests

```bash
npm test
```

This runs Jest, which for every GOV.UK Frontend component:
1. Renders the component using the upstream **Nunjucks** template from `node_modules/govuk-frontend/dist/`
2. Renders the component using the local **Twig** template from `src/templates/components/`
3. Compares the two HTML outputs — they must match exactly

The test fixtures come directly from `node_modules/govuk-frontend/dist/govuk/components/<component>/fixtures.json`.

### Step 5: Fix any failing tests

If tests fail after upgrading, compare the relevant Twig template with its Nunjucks counterpart to identify what changed.

**Nunjucks templates** are at:
```
node_modules/govuk-frontend/dist/govuk/components/<component>/template.njk
node_modules/govuk-frontend/dist/govuk/macros/attributes.njk
node_modules/govuk-frontend/dist/govuk/macros/i18n.njk
```

**Twig templates** are at:
```
src/templates/components/<component>.html.twig
src/templates/macros/attributes.twig
src/templates/macros/i18n.twig
```

#### Key Nunjucks → Twig translation patterns

| Nunjucks | Twig |
|---|---|
| `{% if x %}` | `{% if x %}` |
| `{% if x is defined and x %}` | `{% if x is defined and x is not null %}` |
| `{{ x if x else y }}` | `{{ x is defined and x is not null ? x : y }}` |
| `x \| safe` | `x \| raw` |
| `x \| indent(n)` | `x` (the test suite overrides `indent` to a no-op) |
| `params.x if params.x else 2` | `params.x ?? 2` |
| `{% set x = params.x or default %}` | `{% set x = params.x ?? default %}` |
| `{% for item in items if items %}` | `{% if items %}{% for item in items %}` |

#### Common causes of test failures

1. **New parameter added** — A new option was added to the Nunjucks template. Add the equivalent logic to the Twig template.
2. **Conditional logic changed** — The truthiness rules differ between Nunjucks and Twig. In Twig, use `is defined and x is not null` for explicit null/undefined checks.
3. **New component added** — A new component was added to govuk-frontend. Create a corresponding `src/templates/components/<component>.html.twig` file.
4. **HTML structure changed** — An element was added, removed, or reordered in the Nunjucks template. Update the Twig template to match.

#### Debugging a single component

To test a specific component in isolation and see the diff:

```bash
# Render via Nunjucks (Node.js):
node -e "
const nunjucks = require('nunjucks');
const env = nunjucks.configure('node_modules/govuk-frontend/dist', { trimBlocks: true, lstripBlocks: true });
env.addFilter('indent', str => str);
console.log(env.renderString(
  '{% from \"govuk/components/button/macro.njk\" import govukButton %}{{ govukButton(params) }}',
  { params: { text: 'Continue' } }
));
"

# Render via Twig (PHP):
echo '{"text":"Continue"}' | php tests/renderTwig.php button
```

To run only a specific component's tests:

```bash
npx jest --testNamePattern="button"
```

### Step 6: Update the README compatibility table

In `README.md`, add a row to the top of the compatibility table for the new version:

```markdown
| [v6.1.0](https://github.com/JoshuaLicense/govuk-frontend-twig/releases/tag/v6.1.0) | [v6.1.0](https://github.com/alphagov/govuk-frontend/releases/tag/v6.1.0) |
```

## Development Workflow

### Running tests

```bash
npm test
```

### Running the linter

```bash
npm run lint
```

### Running both

```bash
npm run all
```

### Project structure

```
src/
  templates/
    components/         # Twig component templates (one per GOV.UK Frontend component)
    macros/
      attributes.twig   # Renders HTML attributes (equivalent to attributes.njk)
      i18n.twig         # Renders i18n data attributes (equivalent to i18n.njk)
tests/
  component.test.ts     # Main test file — compares Nunjucks vs Twig output
  setup.ts              # Test setup — loads fixture data from govuk-frontend
  renderTwig.php        # PHP script called by tests to render Twig templates
```

## Important Notes

- **Whitespace matters**: The test compares HTML strings directly, so whitespace differences will cause failures. The Twig templates use `{%-` and `-%}` whitespace control characters to match Nunjucks output.
- **The `indent` filter is a no-op in tests**: Both Nunjucks and Twig environments override the `indent` filter to return the string unchanged, so indentation differences are ignored.
- **Escape handling**: Single quotes (`'`) are escaped differently between renderers — the test normalises `&#39` to `&#039` for Nunjucks, and `\` to `&#92;` for Twig.
- **Strict variables**: The Twig environment runs with `strict_variables: true`, so all variables must be explicitly checked with `is defined` before use.
