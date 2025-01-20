import { Request, Response, NextFunction } from "express"
import { ICreateReportBody, IUpdateReportBody } from "../interfaces/report"
import {
  SCreateReport,
  SFindOneReport,
  SUpdateReport,
} from "../services/report"

export const CCreateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as ICreateReportBody

    body.file = req.file

    // @ts-ignore
    const user = req.user

    const result = await SCreateReport(user!.user_id, body)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}

export const CFindOneReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req?.params?.id

    const result = await SFindOneReport(params)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}

export const CUpdateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as IUpdateReportBody

    body.file = req.file

    // @ts-ignore
    const user = req.user

    const result = await SUpdateReport(user!.user_id, body)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}
