# GOV.UK Frontend Twig

This repository contains a complete set of [Twig](https://twig.symfony.com/) macros that are 100% compliant with the original [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend).

## Compatibility

The following table shows the version of GOV.UK Frontend Twig that you should use for your targeted version of GOV.UK Frontend:

| GOV.UK Frontend Twig Version                                                      | GOV.UK Frontend Version                                                  |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [v4.5.0](https://github.com/LandRegistry/govuk-frontend-twig/releases/tag/v1.0.0) | [v4.5.0](https://github.com/alphagov/govuk-frontend/releases/tag/v4.5.0) |

Versioning of this package will match the [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) major and minor version. Patch versions _may_ differ.

## How to use

### Install
`composer require joshualicense/govuk-frontend-twig`

### Configure
```php
use Composer\Autoload\ClassLoader;
use Twig\Loader\FilesystemLoader;

// Optional: get the vendor directory using reflection from any directory.
$reflection = new \ReflectionClass(ClassLoader::class);
$vendorDir = dirname($reflection->getFileName(), 2);

$loader = new FilesystemLoader();
$loader->addPath($vendorDir . '/joshualicense/govuk-frontend-twig/src/templates', 'govuk-frontend-twig');
```

### Usage
```twig
{% from "@govuk-frontend-twig/components/back-link.html.twig" import govukBackLink %}

{{ govukBackLink({
  text: "Back",
  href: "#"
}) }}
```

All components and macro options can be found in the original [GOV.UK Design System Components](https://design-system.service.gov.uk/components/) documentation.
