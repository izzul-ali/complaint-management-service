import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SDeleteUser(
  deleted_by: string,
  id: string
): Promise<IGlobalResponse<any>> {
  try {
    await prisma.user
      .update({
        where: { user_id: id, deleted_at: null, deleted_by: null },
        data: {
          deleted_by: deleted_by,
          deleted_at: new Date(),
        },
      })
      .catch((err) => {
        throw handleError(err)
      })

    return {
      status: 200,
      message: "Success",
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
