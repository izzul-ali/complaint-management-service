import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "../../prisma/prisma.client"
import { User } from "@prisma/client"

interface IJwtPayload extends JwtPayload {
  id: string
  name: string
  email: string
  phoneNumber: string | null
}

/**
 *
 * @param id userid
 * @param name username
 * @param email email
 */
export const generateJwtToken = (
  id: string,
  name: string,
  email: string,
  phoneNumber: string | null
) => {
  return jwt.sign(
    {
      id,
      name,
      email,
      phoneNumber,
    },
    process.env.JWT_SECRET as string,
    { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRED }
  )
}

export const validateJwtToken = async (token: string): Promise<User | null> => {
  const isMatch = jwt.verify(token, process.env.JWT_SECRET as string, {
    algorithms: ["HS256"],
  }) as IJwtPayload

  if ((!isMatch.email && !isMatch.phoneNumber) || !isMatch.id) {
    return null
  }

  const user = await prisma.user.findFirst({
    where: { user_id: isMatch.id },
  })

  return user
}
