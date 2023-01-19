import Joi from "joi";
export const envConfig = {
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbPort: +process.env.DB_PORT! as number,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbType: process.env.DB_TYPE as any,
  dbSync: !!process.env.DB_SYNC,
};

const { error } = Joi.object({
  port: Joi.number().required(),
  dbName: Joi.string().required(),
  dbPort: Joi.number().required(),
  dbHost: Joi.string().required(),
  dbUser: Joi.string().required(),
  dbPass: Joi.string().required(),
  dbType: Joi.string().required(),
  dbSync: Joi.bool().required(),
}).validate(envConfig);

if (error) {
  throw Error(error.message);
}
