import { IAuthResponse, ILoginDTO } from "../../interfaces/auth"
import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"
import { generateJwtToken } from "../../utils/helper/jwt"

export async function SLogin(
  body: ILoginDTO
): Promise<IGlobalResponse<IAuthResponse>> {
  try {
    const { email_phone, password } = body

    const user = await prisma.user
      .findFirstOrThrow({
        where: {
          deleted_at: null,
          deleted_by: null,
          OR: [{ email: email_phone }, { phone_number: email_phone }],
          password,
        },
        include: {
          role: true,
        },
      })
      .catch(() => {
        throw handleError({
          status: 404,
          message: "Invalid email or password",
        })
      })

    const token = generateJwtToken(
      user.user_id,
      user.name,
      user.email,
      user.phone_number
    )

    const result: IAuthResponse = {
      user_id: user.user_id,
      email: user.email,
      phone_number: user.phone_number,
      name: user.name,
      role_id: user.role_id,
      role_name: user.role.role_name,
      address: user.address,
      category: user.category,
      created_at: user.created_at.toString(),
      updated_at: user.updated_at ? user.updated_at.toString() : null,
      token,
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
