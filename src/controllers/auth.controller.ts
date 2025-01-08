import { ILoginDTO } from "../interfaces/auth"
import { SLogin } from "../services/auth"
import { NextFunction, Request, Response } from "express"

export const CLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as ILoginDTO

    const result = await SLogin(body)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}
