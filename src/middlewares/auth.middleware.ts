import { NextFunction, Request, Response } from "express"
import { handleError } from "../utils/helper/error"
import { validateJwtToken } from "../utils/helper/jwt"

export const MAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers

    if (!authorization)
      throw handleError({
        status: 401,
        message: "Unauthorized!",
      })

    const token = authorization.split(" ")[1]

    const user = await validateJwtToken(token)

    if (!user) {
      res.status(401).json({
        status: 401,
        message: "Unauthorized!",
      })
    }

    // @ts-ignore
    req.user = user as any

    next()
  } catch (e: any) {
    console.log(e)
    res.status(401).json({
      status: 401,
      message: "Unauthorized!",
    })
  }
}
