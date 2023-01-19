import Joi from "joi";

export const validateHelper = (dto: Joi.Schema, body: object) => {
  const { error } = dto.validate(body);
  if (error) {
    return error.message;
  }
};
