export interface IUser {
  id: number;
  companyId: number;
  email: string;
  password: string;
}

export interface ICompany {
  id: number;
  name: string;
  description: string;
}

export interface IJob {
  id: number;
  companyId: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface IAddJob {
  companyId: number;
  title: string;
  description: string;
}

export interface IUpdateJob {
  id: number;
  title: string;
  description: string;
  companyId?: number;
}

export interface CustomError extends Error {
  statusCode?: number;
  message: string;
}
