# From SVG icons to iconfont
----------------------------

## How to generate the fonticon
1. Place your SVG file in this folder (`icons/`)
2. If you're using the (default) `watch` task with the `gulp` command, the `iconfont` task is automatically executed.
If you're not using the `watch` task:
 - run `gulp iconfont` to generate only the iconfont + the related CSS
 - run `gulp build` to generate the theme including the `iconfont` task
3. If this is the first icon that you add, you need to activate the linkage to the generated CSS file  in `TWERKSUBTHEME.libraries.yml` : uncomment the line mentioning `TWERKSUBTHEME-iconfont.css`

** IMPORTANT: You must run the gulp task before adding the SVG icon to the Git repository** because the script rename the file using an unicode to ensure consistent builds in the future : this is useful in cases that you want to keep the unicode mapping unchanged when you add a new SVG file or rename an existing SVG file, so your existing CSS files that use the unicodes won't break.

## How to print the icons
Use an `<i>` with the class generated from the filename (without unicode and extension).
Example for a SVG file initially named `right-arrow.svg` renamed `uEA01-right-arrow.svg` by the gulp script:
`<i class="icon icon-right-arrow"></i>`
