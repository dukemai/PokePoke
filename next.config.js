const withSass = require('@zeit/next-sass');
module.exports = withSass({
  target: 'serverless',
  sassLoaderOptions: {
    includePaths: ['node_modules'],
  },
});
