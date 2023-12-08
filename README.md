# GOV.UK Frontend Twig

This repository contains a collection of [Twig](https://twig.symfony.com/) macros that generate HTML code compatible with the [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) design system.

## Compatibility

Refer to the table below to determine which version of GOV.UK Frontend Twig you should use for your targeted version of [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend):

| GOV.UK Frontend Twig Version                                                       | GOV.UK Frontend Version                                                  |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [v5.0.0](https://github.com/JoshuaLicense/govuk-frontend-twig/releases/tag/v5.0.0) | [v5.0.0](https://github.com/alphagov/govuk-frontend/releases/tag/v5.0.0) |
| [v4.7.0](https://github.com/JoshuaLicense/govuk-frontend-twig/releases/tag/v4.7.0) | [v4.7.0](https://github.com/alphagov/govuk-frontend/releases/tag/v4.7.0) |
| [v4.6.0](https://github.com/JoshuaLicense/govuk-frontend-twig/releases/tag/v4.6.0) | [v4.6.0](https://github.com/alphagov/govuk-frontend/releases/tag/v4.6.0) |
| [v4.5.0](https://github.com/JoshuaLicense/govuk-frontend-twig/releases/tag/v4.5.0) | [v4.5.0](https://github.com/alphagov/govuk-frontend/releases/tag/v4.5.0) |

Note that the versioning of this package will match the major and minor versions of [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend), but patch versions may differ.

## Usage

### Installation

To use GOV.UK Frontend Twig in your project, install it via [Composer](https://getcomposer.org/):

```bash
composer require joshualicense/govuk-frontend-twig
```

### Configuration

In your PHP code, configure the Twig template loader to include the GOV.UK Frontend Twig macros:

```php
use Composer\Autoload\ClassLoader;
use Twig\Loader\FilesystemLoader;

// Optional: get the vendor directory using reflection from any directory.
$reflection = new \ReflectionClass(ClassLoader::class);
$vendorDir = dirname($reflection->getFileName(), 2);

$loader = new FilesystemLoader();
$loader->addPath($vendorDir . '/joshualicense/govuk-frontend-twig/src/templates', 'govuk-frontend-twig');
```

### Usage examples

Here's an example of how to use a GOV.UK Frontend Twig macro in your Twig template:

```twig
{% from "@govuk-frontend-twig/components/back-link.html.twig" import govukBackLink %}

{{ govukBackLink({
  text: "Back",
  href: "#"
}) }}
```

Refer to the original [GOV.UK Design System Components](https://design-system.service.gov.uk/components/) for more information on available components and macro options.
