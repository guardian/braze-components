# Braze Components

A library of React components for displaying Braze messages on DCR and
frontend.

## Development

### Storybook

We use Storybook when building components. Run Storybook with:

```
$ yarn storybook
```

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

NOTE: Ensure you build this library before adding it locally to your project,
by running `yarn build`. You can also use `yarn watch` to build automatically
when the source code is changed.

## Publishing to NPM

You'll need to be part of the @guardian NPM org. Ask someone to add you if
you're not already.

```
$ yarn publishToNPM
```

This will:

- Build the package
- Interactively ask for a new version number (and create a commit for the
  version change in package.json)
- Publish the new release to NPM
