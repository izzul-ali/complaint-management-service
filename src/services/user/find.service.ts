import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { IFindUserParams, IUser } from "../../interfaces/user"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"
import { generatePaginationResponse } from "../../utils/helper/pagination"

export async function SFindUsers(
  params: IFindUserParams
): Promise<IGlobalResponse<IUser[]>> {
  try {
    const { limit = 10, page = 1, role, search } = params

    const [users, count] = await prisma
      .$transaction([
        prisma.user.findMany({
          where: {
            deleted_at: null,
            deleted_by: null,
            name: { contains: search },
            email: { contains: search },
            phone_number: { contains: search },
            role_id: role,
          },
          include: {
            role: true,
          },
          take: +limit,
        }),
        prisma.user.count({
          where: {
            name: { contains: search },
            email: { contains: search },
            phone_number: { contains: search },
            role_id: role,
          },
        }),
      ])
      .catch((err) => {
        throw handleError(err)
      })

    const result: IUser[] = users.map((user) => ({
      user_id: user.user_id,
      email: user.email,
      phone_number: user.phone_number,
      name: user.name,
      role_id: user.role_id,
      role_name: user.role.role_name,
      address: user.address,
      password: user.password,
      category: user.category,
      created_at: user.created_at.toString(),
      updated_at: user.updated_at ? user.updated_at.toString() : null,
    }))

    return {
      status: 200,
      message: "Success",
      data: result,
      pagination: generatePaginationResponse(count, page, limit),
    }
  } catch (err: any) {
    throw handleError(err)
  }
}
