import dayjs from "dayjs"
import {
  ICreateComplaintBody,
  ICreateComplaintResponse,
} from "../../interfaces/complaint"
import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { ICreateScheduleBody } from "../../interfaces/schedule"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SCreateComplaint(
  created_by: string,
  body: ICreateComplaintBody
): Promise<IGlobalResponse<ICreateComplaintResponse>> {
  try {
    const complaint = await prisma.complaint
      .create({
        data: {
          title: body.title,
          category: body.category,
          description: body.description,
          status: body?.status ?? "New",
          client_id: body.client_id,
          created_by,
        },
      })
      .catch((err) => {
        throw handleError(err)
      })

    // insert schedule by technician id
    // only form admin or super admin
    if (body.technician_ids) {
      const schedules: ICreateScheduleBody[] = body.technician_ids.map(
        (id) => ({
          technician_id: id,
          assigned_by: created_by,
          complaint_id: complaint.complaint_id,
          start_date: dayjs(body.start_date).toDate(),
          end_date: dayjs(body.end_date).toDate(),
        })
      )

      await prisma.schedule
        .createMany({
          data: schedules,
        })
        .catch((err) => {
          throw handleError(err)
        })
    }

    // TODO: Send notification to client and technician

    return {
      status: 200,
      message: "Success",
      data: { complaint_id: complaint.complaint_id },
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
