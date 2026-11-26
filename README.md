# renovate-config

Keeps the dependencies of the osdlc repositories up to date with [Renovate](https://docs.renovatebot.com/), from one config. Renovate runs here, on this repository's GitHub Actions runners, as the osdlc Renovate GitHub App. Nothing is sent to a hosted Renovate service.

## What it does

Once a week, Renovate opens pull requests in each repository the app is installed on:

| Updates | Pull requests | Wait after release |
|---|---|---|
| Minor, patch, pin and digest | one grouped pull request a week | 7 days |
| Major | one each | 30 days |
| Workflow action pins | one grouped pull request a week | 7 days |
| `@osdlc` packages, and anything released from an osdlc repository | one group at any time, merged when the checks pass | none |
| Known vulnerabilities (GitHub's alerts and OSV) | at once | none |

Each repository also gets a Dependency Dashboard issue that lists what is pending, waiting or held back.

The wait after a release is a supply-chain guard: a release that is pulled or found to be malicious in its first days is never proposed.

## What is here

- `default.json`: the update rules. Any repository, here or under another account, can use them with `"extends": ["github>osdlc/renovate-config"]`.
- `config.js`: the runner's settings. It finds the repositories itself, needs no `renovate.json` in them and opens no onboarding pull request. It also keeps Renovate out of files another process writes, such as the generated plugin packs.
- `.github/workflows/renovate.yml`: runs Renovate every four hours. A manual run is a dry run unless you uncheck it.
- `.github/workflows/validate.yml`: checks both files with Renovate's validator.

## Changing the rules for one repository

Add a `renovate.json` to that repository. Renovate applies it on top of these rules, so it needs only the difference:

```json
{ "schedule": ["at any time"] }
```

To leave a repository out, remove it from the app's installation.

## Setup

1. Create a GitHub App under the osdlc organisation, with these repository permissions:

   | Permission | Access |
   |---|---|
   | Contents | Read and write |
   | Pull requests | Read and write |
   | Issues | Read and write |
   | Workflows | Read and write |
   | Checks | Read |
   | Commit statuses | Read |
   | Dependabot alerts | Read |
   | Metadata | Read |

   It needs no webhook. To use it from another account too, let it be installed on any account.
2. Install it on the osdlc organisation.
3. In this repository, set the variable `RENOVATE_APP_CLIENT_ID` to the app's client id, and the secret `RENOVATE_APP_PRIVATE_KEY` to a private key generated for it.
4. Run the `renovate` workflow by hand. It is a dry run by default. Read the log, then let the schedule take over.

## License

MIT or Apache-2.0, at your option.
