const dotenv = require('dotenv');

module.exports = async () => {
  const envVars = dotenv.config({ path: '.env.local' }).parsed;
  return Object.assign(
    {},
    envVars,
    process.env,
  );
};