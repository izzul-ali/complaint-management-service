import dayjs from "dayjs"
import { IUpdateComplaintBody } from "../../interfaces/complaint"
import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"
import { ICreateScheduleBody } from "../../interfaces/schedule"

export async function SUpdateComplaint(
  updated_by: string,
  body: IUpdateComplaintBody
): Promise<IGlobalResponse<any>> {
  try {
    const updated_at = new Date()

    await prisma.complaint
      .update({
        where: {
          complaint_id: body.complaint_id,
          deleted_at: null,
          deleted_by: null,
        },
        data: {
          title: body.title,
          category: body.category,
          description: body.description,
          status: body.status,
          client_id: body.client_id,
          updated_by,
          updated_at,
        },
      })
      .catch((err) => {
        throw handleError(err)
      })

    const isScheduled = await prisma.schedule.findFirst({
      where: {
        complaint_id: body.complaint_id,
        deleted_at: null,
        deleted_by: null,
      },
      select: { schedule_id: true, complaint_id: true },
    })

    if (isScheduled) {
      // update schedule
      const updateDatas = body.technician_ids?.map((id) =>
        prisma.schedule.update({
          where: {
            schedule_id: isScheduled.schedule_id,
            deleted_at: null,
            deleted_by: null,
          },
          data: {
            technician_id: id,
            assigned_by: updated_by,
            start_date: body.start_date
              ? dayjs(body.start_date).toDate()
              : null,
            end_date: body.end_date ? dayjs(body.end_date).toDate() : null,
            updated_by,
            updated_at,
          },
        })
      )

      // update schedule by technician id
      if (updateDatas && updateDatas.length > 0) {
        await prisma.$transaction(updateDatas).catch((err) => {
          throw handleError(err)
        })
      }
    } else {
      // Create schedule
      const schedules: ICreateScheduleBody[] =
        body.technician_ids?.map((id) => ({
          technician_id: id,
          assigned_by: updated_by,
          complaint_id: body.complaint_id,
          start_date: body.start_date ? dayjs(body.start_date).toDate() : null,
          end_date: body.end_date ? dayjs(body.end_date).toDate() : null,
        })) ?? []

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
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
