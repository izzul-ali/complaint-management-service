import { IGlobalResponse } from "../../interfaces/global/index.interface"
import { IFindRoleResponse } from "../../interfaces/role"
import { prisma } from "../../prisma/prisma.client"
import { handleError } from "../../utils/helper/error"

export async function SFindRoles(): Promise<
  IGlobalResponse<IFindRoleResponse[]>
> {
  try {
    const results = await prisma.role
      .findMany({
        where: {
          deleted_at: null,
          deleted_by: null,
          role_id: { not: "139e2ce2-4ac5-4ba4-965a-a1a419ef98ce" },
        },
        select: {
          role_id: true,
          role_name: true,
          created_at: true,
          updated_at: true,
        },
      })
      .catch((err) => {
        throw handleError(err)
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
