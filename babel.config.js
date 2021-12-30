const fs = require('fs');

const envLine = fs
  .readFileSync('./.env', 'utf8')
  .split('\n')
  .find(l => l.startsWith('SCRIPT_NM='));
const data = envLine && envLine.slice(10);

function getAliasesFromTsConfig() {
  const tsConfig = require('./tsconfig.json');
  const paths = tsConfig.compilerOptions.paths;
  let alias = {};
  Object.keys(paths).forEach(key => {
    alias[key] = `./${paths[key][0]}`;
  });

  return alias;
}

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
