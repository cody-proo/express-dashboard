import { validateHelper } from "./../../helper/validate.helper";
import { Request, Response } from "express";
import Joi from "joi";
import { User } from "../../entities/user";
import { StatusCode } from "../../constants/status.constants";

export const deleteUserHandler = async (
  request: Request,
  response: Response
) => {
  const errorMessages = validateHelper(deleteUserDto, request.params);
  if (errorMessages) {
    return response
      .status(StatusCode.BAD_REQUEST_EXCEPTION)
      .json({ message: "BadRequestException", errors: errorMessages });
  }
  await User.update({ id: +request.params.id }, { isDelete: true });
  return response
    .status(StatusCode.OK)
    .json({ message: "Delete Successfully" });
};

const deleteUserDto = Joi.object({
  id: Joi.number().required(),
});
