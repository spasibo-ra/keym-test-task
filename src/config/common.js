import Joi from "joi";

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(...["development", "production", "test"])
    .default("development"),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const NODE_ENV = envVars.NODE_ENV;
export default NODE_ENV;