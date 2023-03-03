const branch = process.env.BRANCH || process.env.CI_REF_NAME || '';
const isMaster = branch === 'master';
// semantic-release configuration
module.exports = {
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
    // https://github.com/semantic-release/github
    [
      '@semantic-release/github',
      {
        successComment: false,
        failComment: false
      }
    ],
    // https://github.com/semantic-release/git
    isMaster && [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'yarn.lock', 'npm-shrinkwrap.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      }
    ]
  ],
};
