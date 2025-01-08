export interface ICreateUser {
  email: string
  phone_number?: string
  name: string
  address?: string
  category?: string
  password: string
  role_id: string
}

export interface IUpdateUser extends ICreateUser {
  id: string
}
