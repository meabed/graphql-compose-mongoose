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
  ],
};
