import joi from 'joi';

const envVarsSchema = joi
  .object()
  .keys({
    RELEASE_TYPE: joi
      .string()
      .valid("dev", "prod")
      .required(),
    BROWSERSTACK_USERNAME: joi
      .string()
      .required(),
    BROWSERSTACK_ACCESS_KEY: joi
      .string()
      .required(),
    CAPABILITIES: joi
      .string()
      .description("Array of Capabilities to run the automation suite, please see README.md for details")
      .required(),
    BROWSERSTACK_APP_ID: joi
      .string()
      .required(),
  }).unknown();

  const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.RELEASE_TYPE
};

