import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SDeleteUser(id: string): Promise<IGlobalResponse<any>> {
  try {
    await prisma.user
      .delete({
        where: { user_id: id },
      })
      .catch(() => {
        throw handleError({
          status: 500,
          message: "Something went wrong!",
        })
      })

    return {
      status: 200,
      message: "Success",
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
