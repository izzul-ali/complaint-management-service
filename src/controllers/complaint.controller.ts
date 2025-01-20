import { Request, Response, NextFunction } from "express"
import {
  ICreateComplaintBody,
  IFindComplaintParams,
  IUpdateComplaintBody,
} from "../interfaces/complaint"
import {
  SCreateComplaint,
  SFindAllComplaint,
  SFindOneComplaint,
  SUpdateComplaint,
} from "../services/complaint"

export const CFindComplaints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.query as IFindComplaintParams

    const result = await SFindAllComplaint(params)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}

export const CFindOneComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req?.params?.id

    const result = await SFindOneComplaint(params)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}

export const CCreateComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as ICreateComplaintBody

    // @ts-ignore
    const user = req.user

    const result = await SCreateComplaint(user!.user_id, body)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}

export const CUpdateComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as IUpdateComplaintBody

    // @ts-ignore
    const user = req.user

    const result = await SUpdateComplaint(user!.user_id, body)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(error?.status || 500).send(error)
  }
}
