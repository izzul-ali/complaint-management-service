import {
  IFindComplaintParams,
  IFindComplaintResponse,
} from "../../interfaces/complaint"
import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SFindAllComplaint(
  query: IFindComplaintParams
): Promise<IGlobalResponse<IFindComplaintResponse[]>> {
  try {
    const complaints = await prisma.complaint
      .findMany({
        where: {
          deleted_at: null,
          deleted_by: null,
          title: { contains: query.search },
          status: query.status,
          category: query.category,
          schedules: query.technician_id
            ? { some: { technician_id: query.technician_id } }
            : undefined,
        },
        select: {
          complaint_id: true,
          category: true,
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
      .catch((err) => {
        throw handleError(err)
      })

    const results: IFindComplaintResponse[] = complaints.map((it) => {
      const schedule: any = it.schedules?.[0] ? { ...it.schedules?.[0] } : null

      if (!!schedule) {
        delete schedule.technician
      }

      return {
        title: it.title,
        complaint_id: it.complaint_id,
        client_category: it.category,
        description: it.description,
        status: it.status,
        schedule,
        created_at: it.created_at,
        created_by: it.created_by,
        updated_at: it.updated_at,
        updated_by: it.updated_by,
        client: it.client,
        technicians: it.schedules.map((sch) => sch.technician),
      }
    })

    return {
      status: 200,
      message: "Success",
      data: results,
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
