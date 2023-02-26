<?php

use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\Loader\ChainLoader;
use Twig\Loader\FilesystemLoader;

require_once 'vendor/autoload.php';

$component = $argv[1];

$stdin = [];
$stdin = fgets(STDIN);
if ($stdin) {
  $stdin = json_decode($stdin, true);
}

$macroName = str_replace('-', '', ucwords($component, '-'));;

$filesystemLoader = new FilesystemLoader();
$filesystemLoader->addPath(dirname(__DIR__) . '/src/templates', 'govuk-frontend-twig');

$arrayLoader = new ArrayLoader([
  'test' => "{% from '@govuk-frontend-twig/components/" . $component . ".html.twig' import govuk" . $macroName . " %}{{ govuk" . $macroName . "(params) }}"
]);

$chainLoader = new ChainLoader([$filesystemLoader, $arrayLoader]);

$twig = new Environment(
  $chainLoader,
  [
    'strict_variables' => true,
  ]
);

$html = $twig->render('test', ['params' => $stdin]);

echo $html;
