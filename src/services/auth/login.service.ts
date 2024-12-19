import { IAuthResponse, ILoginDTO } from "@/interfaces/auth"
import { IGlobalResponse } from "@/interfaces/global/response.interface"
import { prisma } from "@/prisma/prisma.client"

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
      .catch()

    const result: IAuthResponse = {
      user_id: user.user_id,
      email: user.email,
      phone_number: user.phone_number,
      name: user.name,
      role_id: user.role_id,
      created_at: user.created_at.toString(),
      updated_at: user.updated_at ? user.updated_at.toString() : null,
      role: {
        role_id: user.role.role_id,
        role_name: user.role.role_name,
        created_at: user.role.created_at.toString(),
        updated_at: user.role.updated_at
          ? user.role.updated_at.toString()
          : null,
      },
    }

    return {
      status: 200,
      message: "Success",
      data: result,
    }
  } catch (error) {
    throw error
  }
}
