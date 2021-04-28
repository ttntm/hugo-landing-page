# hugo-landing-page

A simple landing page built with Hugo and Tailwind CSS

> There's also an [11ty Version](https://github.com/ttntm/11ty-landing-page)

## How to use this template

**Requirements:**

1. Hugo (developed and tested with version 0.58.0)
2. Tailwind CSS
3. gulp

All other dependencies are either linked from a CDN or included in this repository.

**Setup:**

1. Fork, clone or download
2. `cd` into the root folder
3. run `npm install`
4. run `npm run start`
5. open a browser and go to `http://localhost:1313`

**Basic configuration:**

1. Hugo -> `./config.toml`
2. Tailwind -> `./tailwind.config.js`
3. Netlify -> `./netlify.toml`

> For better development experience, please have a look at `./tailwind.config.js` and either disable `purge` or comment it - otherwise you'll have a very limited selection of Tailwind classes available.

Keep in mind that `page.css` can be re-built anytime via `gulp css` - no need to make changes to the generated files in `./static/css`.

Please note that `gulp css` _does not_ include that `normalize.css` file used for the 2 regular pages (imprint, privacy).

**Change Content:**

All page content is stored in `./content`.

`./content/sections/` is where each section's content can be found.

The individual tile/card elements for the "Features" screen are stored in `./content/sections/features/`

**Change Templates/Layout:**

Page structure and templates are stored in `./layouts` and can be edited there.

Best have a look at `./layouts/_default/baseof.html` first to understand how it all comes together - the page itself is constructed from partials in `./layouts/partials` and each section has a corresponding template file stored in the folder `./layouts/partials/sections`.

`index.html` in `./layouts` simply arranges everything, i.e. sections can be re-ordered/removed/... there.

**Change images:**

Images are stored in `./static/img`; everything in there can be considered a placeholder that should eventually be replaced with your actual production images.
