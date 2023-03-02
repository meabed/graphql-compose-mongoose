// https://semantic-release.gitbook.io/semantic-release/usage/configuration
const branch = process.env.BRANCH || process.env.CI_REF_NAME || '';
// semantic-release configuration
module.exports = {
  branches: [
    {
      name: 'master',
      prerelease: false,
    },
    { name: branch, prerelease: true },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'breaking', release: 'major' },
          { type: 'feat', release: 'minor' },
          // match anything else
          { type: '**', release: 'patch' },
          { subject: '**', release: 'patch' },
          { message: '**', release: 'patch' },
        ],
      },
    ],
    // https://github.com/semantic-release/npm
    ['@semantic-release/npm'],
  ],
};
