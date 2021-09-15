# Braze Components

A library of React components for displaying Braze messages on DCR and
frontend.

## Development

### Local Setup

```
$ bin/setup
```

### Storybook

We use Storybook when building components. Run Storybook with:

```
$ yarn storybook
```

The Grid image picker integration in Storybook requires auth. If necessary
you'll be redirected to the [gutools login service]. When developing, this means
running the login service locally. Often when developing you won't need to use
the image picker. In this case you can skip auth entirely by running Storybook
like this:

```
$ STORYBOOK_DISABLE_AUTH=true yarn storybook
```

This means you won't need to run the login service locally.

[gutools login service]: https://github.com/guardian/login.gutools

### Point a project to your local version of @guardian/braze-components

Use [`yarn link`] to develop against a locally checked out version of this
library:

In your local checkout of `@guardian/braze-components`:

```
$ yarn link
```

And then in the project consuming the client (e.g. DCR/frontend):

```
$ yarn link "@guardian/braze-components"
```

To revert back to using the published version of the package:

```
$ yarn unlink "@guardian/braze-components"
$ yarn install --force
```

[`yarn link`]: https://classic.yarnpkg.com/en/docs/cli/link/

NOTE:

-   Ensure you build this library before adding it locally to your project,
    by running `yarn build`. You can also use `yarn watch` to build automatically
    when the source code is changed.

-   The external project (e.g. DCR/frontend) may not be set up to watch changes from linked modules. Removing: `ignored: /node_modules/,` from [`watchOptions`](https://github.com/guardian/frontend/blob/main/dev/watch.js#L30) in frontend will enable `make watch` (in frontend) to also track changes to `braze-components`.

## Publishing to NPM

You'll need to be part of the @guardian NPM org. Ask someone to add you if
you're not already.

```
$ yarn release
```

This will:

-   Build the package
-   Interactively ask for a new version number (and create a commit for the
    version change in package.json)
-   Publish the new release to NPM
-   Push new commits/tags to GitHub
