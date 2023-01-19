import { Request, Response } from "express";
import Joi from "joi";
import { StatusCode } from "../../constants/status.constants";
import { User } from "../../entities/user";
import { validateHelper } from "../../helper/validate.helper";

export const selectAllUserHandler = async (
  request: Request,
  response: Response
) => {
  const users = await User.find({ where: { isDelete: false } });
  return response.status(StatusCode.OK).json({
    message: "Get All Users List",
    data: {
      users,
    },
  });
};

export const selectUserByIdHandler = async (
  request: Request,
  response: Response
) => {
  const errorMessages = validateHelper(selectUserByIdDto, request.body);
  if (errorMessages) {
    return response
      .status(StatusCode.BAD_REQUEST_EXCEPTION)
      .json({ message: "BadRequestException", errors: errorMessages });
  }
  const user = await User.findOne({
    where: {
      id: +request.params.id,
    },
  });
  if (!user) {
    return response
      .status(StatusCode.NOT_FOUND)
      .json({ message: "User Not Found" });
  }
  return response
    .status(StatusCode.OK)
    .json({ message: "Get Single User", data: { user } });
};

const selectUserByIdDto = Joi.object({
  id: Joi.number().required(),
});
