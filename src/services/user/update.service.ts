import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { IUpdateUser } from "../../interfaces/user"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SUpdateUser(
  updated_by: string,
  body: IUpdateUser
): Promise<IGlobalResponse<any>> {
  try {
    await prisma.user
      .update({
        where: { user_id: body.id, deleted_at: null, deleted_by: null },
        data: {
          name: body.name,
          password: body.password,
          email: body.email,
          category: body.category,
          address: body.address,
          phone_number: body.phone_number,
          role_id: body.role_id,
          updated_by,
          updated_at: new Date(),
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
