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

    const result = await SCreateUser(body)

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

    const result = await SUpdateUser(body)

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

    const result = await SDeleteUser(body.id)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}
