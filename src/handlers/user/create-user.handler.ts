import { validateHelper } from "./../../helper/validate.helper";
import { Request, Response } from "express";
import Joi from "joi";
import { User, UserStatus, UserType } from "../../entities/user";
import { StatusCode } from "../../constants/status.constants";

export const createUserHandler = async (
  request: Request,
  response: Response
) => {
  const errorMessages = validateHelper(createUserDto, request.body);
  if (errorMessages) {
    return response
      .status(StatusCode.BAD_REQUEST_EXCEPTION)
      .json({ message: "BadRequestException", errors: errorMessages });
  }
  const createdUser = await User.save(
    User.create({
      ...request.body,
      status: UserStatus,
    })
  );

  return response.status(StatusCode.CREATED).json({
    message: "User Create Successfully",
    data: {
      user: createdUser,
    },
  });
};

const createUserDto = Joi.object({
  name: Joi.string().required(),
  website: Joi.string().required(),
  serverUrl: Joi.string().required(),
  serverPort: Joi.string().required(),
  type: Joi.string().valid(Object.values(UserType)).required(),
  phone: Joi.string().required(),
});
