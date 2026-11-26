// The runner's own settings, read by the renovate workflow. The update rules
// themselves are in default.json, which this extends; a repository can add a
// renovate.json of its own to change them.
//
// Every osdlc repository the Renovate app is installed on is processed, with
// no onboarding pull request and no renovate.json required. The rules below
// keep Renovate out of files another process writes, where a bump would be
// replaced on the next sync.
module.exports = {
  platform: 'github',
  autodiscover: true,
  // The app's token sees only osdlc repositories. Of those, every one but the
  // two that are generated in full: marketplace (the published plugin packs)
  // and osdlc-acceptance (a test fixture).
  autodiscoverFilter: ['!/^osdlc\\/(marketplace|osdlc-acceptance)$/'],
  onboarding: false,
  requireConfig: 'optional',
  extends: ['local>osdlc/renovate-config'],
  packageRules: [
    {
      description: 'Written by the sdlc mirror on each release.',
      matchRepositories: ['osdlc/osdlc'],
      matchFileNames: ['.github/workflows/test.yml', '.github/workflows/tag.yml'],
      enabled: false,
    },
    {
      description: 'Only site/ is edited here; the rest of parley is generated.',
      matchRepositories: ['osdlc/parley'],
      matchManagers: ['github-actions'],
      enabled: false,
    },
    {
      description: 'Templates for the release packages, filled in at release time.',
      matchRepositories: ['osdlc/skillwright'],
      matchFileNames: ['**/release/templates/**'],
      enabled: false,
    },
    {
      description: 'The formulas are written by each tool’s release workflow.',
      matchRepositories: ['osdlc/homebrew-tap'],
      matchManagers: ['homebrew'],
      enabled: false,
    },
  ],
}
