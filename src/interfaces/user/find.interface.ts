import { IGlobalParams } from "../global/index.interface"

export interface IFindUserParams extends IGlobalParams {
  role?: string
}

export interface IUser {
  user_id: string
  email: string
  phone_number: string | null
  name: string
  role_id: string
  address: string | null
  category: string | null
  role_name: string
  password: string
  created_at: string
  updated_at: string | null
}
