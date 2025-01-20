import { NextFunction, Request, Response } from "express"
import {
  SCreateUser,
  SUpdateUser,
  SFindUsers,
  SDeleteUser,
} from "../services/user"
import { IFindUserParams } from "../interfaces/user/find.interface"
import { ICreateUser, IUpdateUser } from "../interfaces/user"

export const CFindUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.query as IFindUserParams

    const result = await SFindUsers(params)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}

export const CCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as ICreateUser

    // @ts-ignore
    const user = req.user

    const result = await SCreateUser(user!.user_id, body)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}

export const CUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as IUpdateUser

    // @ts-ignore
    const user = req.user

    const result = await SUpdateUser(user!.user_id, body)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}

export const CDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.params as { id: string }

    // @ts-ignore
    const user = req.user

    const result = await SDeleteUser(user!.user_id, body.id)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}
