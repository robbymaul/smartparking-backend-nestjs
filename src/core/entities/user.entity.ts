export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id?: string,
    name: string,
    email: string,
    password: string,
    is_deleted?: boolean,
  ) {
    this.id? = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.is_deleted = is_deleted;
  }
}
