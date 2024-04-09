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
