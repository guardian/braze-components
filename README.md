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

#### Steps following merge to main

For braze-components:
-   Merge braze-components PR to main (in GitHub)
-   In local iTerm, checkout main branch and git pull
-   Run yarn release and follow instructions to bump the repo version and generate NPM
-   When the GitHub release page displays in the browser, review and complete release

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
