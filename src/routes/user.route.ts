import express from "express";
import { createUserHandler } from "../handlers/user/create-user.handler";
import { deleteUserHandler } from "../handlers/user/delete-user.handler";
import {
  selectAllUserHandler,
  selectUserByIdHandler,
} from "../handlers/user/select-user.handler";
import { updateUserHandler } from "../handlers/user/update-user.handler";

const router = express.Router();

router.get("/", selectAllUserHandler);
router.get("/:id", selectUserByIdHandler);
router.post("/", createUserHandler);
router.delete("/:id", deleteUserHandler);
router.patch("/:id", updateUserHandler);

export const userRouter = router;
