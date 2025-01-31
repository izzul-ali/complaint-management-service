import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { ICreateUser } from "../../interfaces/user"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SCreateUser(
  created_by: string,
  body: ICreateUser
): Promise<IGlobalResponse<any>> {
  try {
    await prisma.user
      .create({
        data: {
          name: body.name,
          password: body.password,
          email: body.email,
          phone_number: body.phone_number,
          role_id: body.role_id,
          address: body.address,
          category: body.category,
          created_by,
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
