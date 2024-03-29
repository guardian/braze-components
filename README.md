# Braze Components

A library of React components for displaying Braze messages on DCR and
frontend.

Braze messages are exposed in two ways to address two separate use cases.

1. One-shot messages
2. Persistent notifications

One-shot messages use
[Braze's in-app messages](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/in-app_messaging/overview/)
to show a user a single message impression. This is analagous to an ad
impression. As with ads, these messages are often competing with other
systems for shared message slots on the page. These messages are exposed
by the [BrazeMessages](src/logic/BrazeMessages.tsx) class.

Persistent notifications are backed by
[Braze content cards](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/content_cards/data_models/).
These notifications persist until they are dismissed (automatically or by
the user), or they expire. Notifications from different sources can
peacfully co-exist. These notifications are exposed by the
[BrazeCards](src/logic/BrazeCards.ts) class.

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

Sometimes it's useful to test a braze-components change against a locally
running version of a project which uses it, for example DCR.

It is recommended to use [`yalc`](https://github.com/wclr/yalc) to do this.

#### Install yalc

Follow the instructions in the [yalc README](https://github.com/wclr/yalc#installation).

#### Build @guardian/braze-components locally

```
$ yarn build
```

#### Publish your local @guardian/braze-components to the local yalc registry

In your local checkout of `@guardian/braze-components`, at the root:

```
$ yalc publish
```

#### Use the version of braze-components from the local yalc registry

```
$ yalc add @guardian/braze-components
```

For example, for DCR this should be run from within the dotcom-rendering
sub-project.

This will update the local package.json with a yalc ref. This is expected, but
the change shouldn't be committed.

#### Notes

The steps above should be repeated when you make a change to braze-components
and you want to see it locally. Don't forget to re run `yarn build`!

## Publishing to NPM

Releasing to NPM is handled with [changesets] and is performed by CI.

On your feature branch, before merging, run `yarn changeset`. This will
interactively ask you what kind of change this is (major, minor, patch) and
allow you to describe the change. Commit the generated changeset file to git and
push to your branch.

When you merge the branch, a version release PR will be automatically opened.
When this PR is merged, a new release will be pushed to NPM. The version change
will be based on the information in your changeset file. If the version release
PR isn't merged straight away, that's fine. Any other PRs with changesets merged
in the meantime will cause the release PR to be updated.

Not all PRs require releasing and therefore don't need a changeset. For example
a change to the README.

[changesets]: https://github.com/changesets/changesets

### Steps following merge to main

For dotcom-rendering:
-   Run `checkout` main branch and git pull
-   Run `checkout -b` to start a new branch for the update PR
-   Update the braze-components dependency in `dotcom-components/dotcom-components/package.json`
-   Run `yarn` to update the yarn.lock file in the DCR root
-   Push the branch and create the PR in GitHub. 
-   If the change involves visual changes to components, capture this via screenshots and include in the PR
-   If the change involves updates to component layout, add code to DCR Storybook files to reflect those changes
-   If necessary (it isn't always), take `DCR CODE` (announce first in the `P&E/Dotcom CODE Semaphore` chat) and deploy code there.
-   If all is good and the PR is approved, merge PR to main (in GitHub)

For frontend:
-   Run `checkout` main branch and git pull
-   Run `checkout -b` to start a new branch for the update PR
-   Update the braze-components dependency in /package.json
-   Run `make install compile` to update dependency lock file
-   Push the branch and create the PR in GitHub. 
-   If necessary (it isn't always), take `Frontend CODE` (announce first in the `P&E/Dotcom CODE Semaphore` chat) and deploy code there.
-   If all is good and the PR is approved, merge PR to main (in GitHub)

## CI/CD

Whenever you push to GitHub actions will be triggered to run Jest tests, the
TypeScript compiler etc. A TeamCity build will also be triggered. On the `main`
branch if the TeamCity build is successful Riff Raff will deploy Storybook to
https://braze-components.gutools.co.uk.
