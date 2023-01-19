import { validateHelper } from "./../../helper/validate.helper";
import Joi from "joi";
import { Request, Response } from "express";
import { User, UserStatus, UserType } from "../../entities/user";
import { StatusCode } from "../../constants/status.constants";

export const updateUserHandler = async (
  request: Request,
  response: Response
) => {
  const bodyErrorMessages = validateHelper(updateUserDto, request.body);
  if (bodyErrorMessages) {
    return response.status(StatusCode.BAD_REQUEST_EXCEPTION).json({
      message: "BadRequestException",
      errors: bodyErrorMessages,
    });
  }
  const paramErrorMessages = validateHelper(updateUserParamDto, request.params);
  if (paramErrorMessages) {
    return response.status(StatusCode.BAD_REQUEST_EXCEPTION).json({
      message: "BadRequestException",
      errors: paramErrorMessages,
    });
  }
  const user = User.findOne({ where: { id: +request.params.id } });
  if (!user) {
    return response
      .status(StatusCode.NOT_FOUND)
      .json({ message: "User Not Found" });
  }
  await User.save(Object.assign(user, request.body));
  return response
    .status(StatusCode.OK)
    .json({ message: "User Update Successfully" });
};

export const updateUserDto = Joi.object({
  name: Joi.string().optional(),
  website: Joi.string().optional(),
  serverUrl: Joi.string().optional(),
  serverPost: Joi.string().optional(),
  type: Joi.string().valid(UserType).optional(),
  phone: Joi.string().optional(),
  status: Joi.string().valid(Object.values(UserStatus)).optional(),
});

export const updateUserParamDto = Joi.object({
  id: Joi.number().required(),
});
