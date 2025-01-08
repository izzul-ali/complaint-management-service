import jwt, { JwtPayload } from "jsonwebtoken"

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

export const validateJwtToken = (token: string) => {
  const isMatch = jwt.verify(token, process.env.JWT_SECRET as string, {
    algorithms: ["HS256"],
  }) as IJwtPayload

  if (!isMatch.email && !isMatch.phoneNumber) {
    throw new Error("Invalid Token")
  }
}
