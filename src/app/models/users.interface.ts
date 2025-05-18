export interface UserRegist {
  name: string;
  lastName: string;
  password: string;
  phone: string;
  mail: string;
  role: string;
}

export interface User {
  _id: string;
  name: string;
  lastName: string;
  mail: string;
  phone: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
