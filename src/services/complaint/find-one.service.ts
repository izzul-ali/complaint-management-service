import { IFindComplaintResponse } from "../../interfaces/complaint"
import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SFindOneComplaint(
  id: string
): Promise<IGlobalResponse<IFindComplaintResponse>> {
  try {
    const complaint = await prisma.complaint
      .findFirstOrThrow({
        where: {
          deleted_at: null,
          deleted_by: null,
          complaint_id: id,
        },
        select: {
          complaint_id: true,
          category: true,
          client_id: true,
          client: {
            select: {
              user_id: true,
              address: true,
              name: true,
              email: true,
              phone_number: true,
            },
          },
          created_at: true,
          created_by: true,
          description: true,
          schedules: {
            select: {
              complaint_id: true,
              schedule_id: true,
              assigned_by: true,
              created_at: true,
              start_date: true,
              end_date: true,
              admin: {
                select: {
                  user_id: true,
                  name: true,
                  email: true,
                  phone_number: true,
                },
              },
              technician: {
                select: {
                  user_id: true,
                  name: true,
                  email: true,
                  phone_number: true,
                },
              },
            },
          },
          status: true,
          title: true,
          updated_at: true,
          updated_by: true,
        },
      })
      .catch(() => {
        throw handleError({
          status: 404,
          message: "Complaint not found",
        })
      })

    const totalComplaint = await prisma.complaint.count({
      where: { client_id: complaint.client_id },
    })

    const schedule: any = complaint.schedules?.[0]
      ? { ...complaint.schedules?.[0] }
      : null

    if (!!schedule) {
      delete schedule.technician
    }

    const result: IFindComplaintResponse = {
      title: complaint.title,
      complaint_id: complaint.complaint_id,
      client_category: complaint.category,
      description: complaint.description,
      status: complaint.status,
      schedule,
      created_at: complaint.created_at,
      created_by: complaint.created_by,
      updated_at: complaint.updated_at,
      updated_by: complaint.updated_by,
      client: complaint.client,
      total_client_complaint: totalComplaint,
      technicians: complaint.schedules.map((sch) => sch.technician),
    }

    return {
      status: 200,
      message: "Success",
      data: result,
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
