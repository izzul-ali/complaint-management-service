import { IRole } from "../role"
import { IUser } from "../user"

export interface ILoginDTO {
  email_phone: string
  password: string
}

export interface IAuthResponse extends IUser {
  role: IRole
}
