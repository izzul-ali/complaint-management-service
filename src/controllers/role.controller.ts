import { NextFunction, Request, Response } from "express"
import { SFindRoles } from "../services/role"

export const CFindRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SFindRoles()

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}
