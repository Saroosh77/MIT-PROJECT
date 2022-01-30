export interface User {
    _id: string
    name: string
    email: string
    hashed_password: string
    salt: string
    created_at: Date
    updated_at: Date
    // _password: string
  }
  export interface CreateUser {
    name: string
    email: string
    password: string
  }
  