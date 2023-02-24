<?php

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require_once 'vendor/autoload.php';

// First arg to CLI - template path
$templatePath = $argv[1];

// data is STDIN aka `echo '{"title": "hello there"}' | php index.php '@upone/bar.twig'`
$in_data = [];
$in = fgets(STDIN);
if ($in) {
  $in_data = json_decode($in, true);
}

$loader = new FilesystemLoader(dirname(__DIR__) . '/src/templates');
$twig = new Environment(
  $loader,
  [
    'strict_variables' => true,
  ]
);

// Load the template that was first arg to this script
$template = $twig->load($templatePath);

// Pass data to template and get back HTML
$html = $template->render(['params' => $in_data]);

echo $html;
