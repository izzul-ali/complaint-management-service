import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"
import {
  IUpdateReportResponse,
  IUpdateReportBody,
  IReportFile,
} from "../../interfaces/report"
import { decode } from "base64-arraybuffer"
import { supabase } from "../../configs/supabase"
import dayjs from "dayjs"

export async function SUpdateReport(
  updated_by: string,
  body: IUpdateReportBody
): Promise<IGlobalResponse<IUpdateReportResponse>> {
  try {
    const currentDate = dayjs().toDate()

    const [report] = await prisma
      .$transaction([
        prisma.report.update({
          where: {
            report_id: body.report_id,
            deleted_at: null,
            deleted_by: null,
          },
          data: {
            complaint_id: body.complaint_id,
            schedule_id: body.schedule_id,
            notes: body.note,
            status_update: body.status,
            updated_by,
            updated_at: currentDate,
          },
        }),
        prisma.complaint.update({
          where: {
            complaint_id: body.complaint_id,
            deleted_at: null,
            deleted_by: null,
          },
          data: {
            status: body.status,
            updated_by: updated_by,
            updated_at: currentDate,
          },
        }),
      ])
      .catch((err) => {
        throw handleError(err)
      })

    const file = body?.file

    // insert file to supabase storage
    if (file && body?.file_path) {
      // decode file buffer to base64
      const fileBase64 = decode(file.buffer.toString("base64"))

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
      const fileName = file.originalname + "-" + uniqueSuffix

      // upload the file to supabase
      const { data, error } = await supabase.storage
        .from("report")
        .update(body.file_path, fileBase64, {
          contentType: file.mimetype,
        })

      if (error) {
        throw error
      }

      // get public url of the uploaded file
      const { data: image } = supabase.storage
        .from("report")
        .getPublicUrl(data.path)

      const storedFile: IReportFile = {
        file_id: data.id,
        file_path: data.path,
        file_public_url: image.publicUrl,
        file_name: fileName,
      }

      // update file report path
      await prisma.report.update({
        where: {
          report_id: report.report_id,
          deleted_at: null,
          deleted_by: null,
        },
        data: {
          file: JSON.stringify(storedFile),
        },
      })
    }

    return {
      status: 200,
      message: "Success",
      data: { report_id: report.report_id },
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
