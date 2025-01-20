import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { IFindOneReportResponse, IReportFile } from "../../interfaces/report"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SFindOneReport(
  id: string
): Promise<IGlobalResponse<IFindOneReportResponse | null>> {
  try {
    const report = await prisma.report
      .findFirst({
        where: { complaint_id: id, deleted_at: null, deleted_by: null },
        select: {
          complaint_id: true,
          report_id: true,
          schedule_id: true,
          notes: true,
          file: true,
          status_update: true,
          technician_created: {
            select: {
              user_id: true,
              name: true,
              email: true,
              phone_number: true,
            },
          },
          created_at: true,
          technician_updated: {
            select: {
              user_id: true,
              name: true,
              email: true,
              phone_number: true,
            },
          },
          updated_at: true,
        },
      })
      .catch((err) => {
        throw handleError(err)
      })

    if (!report) {
      return {
        status: 200,
        message: "Success",
        data: null,
      }
    }

    const file = report?.file ? (JSON.parse(report.file) as IReportFile) : null

    return {
      status: 200,
      message: "Success",
      data: { ...report, file },
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
