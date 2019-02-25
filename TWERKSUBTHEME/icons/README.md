# From SVG icons to the SVG store
---------------------------------

## How to generate the SVG store
1. Place your SVG file in this folder (`icons/`)
2. If you're using the (default) `watch` task with the `gulp` command, the `svgstore` task is automatically executed.
If you're not using the `watch` task:
 - run `gulp svgstore` to generate only the svgstore
 - run `gulp build` to generate the theme including the `svgstore` task


## How to print the icons
Use the markup `<svg class='icon'><use xlink:href='#icon-filename"/></svg>` with the class generated from the filename.
Example for a SVG file named `drupal.svg`:
`<svg class='icon'><use xlink:href='#icon-drupal"/></svg>`

@TODO: notes and link to the Twerk More module (Twig Plugin)
