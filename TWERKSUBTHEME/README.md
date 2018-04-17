# BUILDING A THEME WITH FORTY TWO

The Twerk theme is designed to be extended by a sub-theme. You shouldn't modify
any of the CSS or PHP files in the `twerk/` folder ; instead create a
sub-theme which is located outside of the root `twerk/` folder.

## Twerk base theme location

Twerk follows the specifications of theme locations as described on the page
https://www.drupal.org/docs/8/theming-drupal-8/drupal-8-theme-folder-structure.

So it is important to install the Twerk base theme in the folder `/themes/contrib/twerk`

## Setup the location for your new sub-theme.  

  Copy the TWERKSUBTHEME folder out of the `twerk/` folder and rename it to be your new sub-theme.  
  **IMPORTANT:** The name of your sub-theme must start with an *alphabetic character* and can only
  contain *lowercase letters, numbers and underscores*.

  For example, copy the `/themes/contrib/twerk/TWERKSUBTHEME` folder and rename it as `/themes/custom/foo`.

  Why? Each theme should reside in its own folder. To make it easier to upgrade Twerk, sub-themes should
  reside in a folder separate from the base theme.

<!-- ## Automated setup of base theme with drush

  You can use drush to setup your new base theme. Follow the steps below and
  consult `drush help twerk` for help.

  1. **Ensure drush knows about the twerk command**

    After you have downloaded Twerk and placed it in your `themes`
    directory, you need to enable the Twerk theme and set Twerk as the
    default theme on the Appearance administrative page.

    Type: `drush en twerk` and go to Administrative Menu > Appearance and
    next to Twerk, click on *Set as default*. You can also use drush for this
    by using `drush config-set system.theme default twerk`.

    The `drush twerk` command will now be available to run.

  2. **Run the drush twerk command with the following parameters.**

     In the command line, use the `drush twerk "My theme name" my_theme`
     command to generate a subtheme with machine name foo and human name
     "Foo theme" in your Drupal site.

     Tip: Type `drush help twerk` to view options and example commands. -->


## Setup the basic information for your sub-theme.

  In your new sub-theme folder, rename the `TWERKSUBTHEME.info.yml.txt` file to include
  the name of your new sub-theme and remove the ".txt" extension. Then edit
  the .info.yml file by editing the name and description field.

  For example, rename the `foo/TWERKSUBTHEME.info.yml` file to `foo/foo.info.yml`. Edit the
  foo.info.yml file and change `"name = Twerk sub-theme"`. Do the same
  with the description property.
  Make sure you also rename the libraries section `TWERKSUBTHEME/main` to `foo/main` in
  the .info.yml file.

  Also rename the TWERKSUBTHEME.libraries.yml and the TWERKSUBTHEME.theme files. For example rename
  the `foo/TWERKSUBTHEME.libraries.yml` file to `foo/foo.libraries.yml` and the `foo/TWERKSUBTHEME.theme`
  file to `foo/foo.theme`. Replace any occurences of TWERKSUBTHEME in any of these files.

  The main javascript file needs to be renamed in order to work. A reference to
  that file can be found in the subtheme's `.info.yml` file, and the file itself is
  located in the folder `js/`. Rename the file to whatever you want and
  change the reference to that file in the `.info.yml` file. Best practice is to
  name it like the theme's machine name. Also rename the behavior in the
  `TWERKSUBTHEME.js` file to reflect your theme's name.

## Configuration of your subtheme.

  A lot of settings can be done on the sub-theme appearance page. CSS/SASS specific
  settings can be set in `sass/config/_variables.sass`.

## Responsive

  The grid-system used is based on flexbox via Bootstrap 4.

## Gulp

  You should use Gulp in this sub-theme. Just do `npm install` in the theme's folder
  for installing and use `gulp` for running the watcher. We've added some nice features:
  * Sass compiling, including source maps and autoprefixer;
  * JS Hint, and uglify;
  