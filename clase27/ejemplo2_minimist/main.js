const parseArgs = require('minimist');

const options = {
  default: {
    environment: 'dev'
  },
  alias: {
    e: 'environment'
  }
};

const args = parseArgs(process.argv.slice(2), options);

console.log(args);