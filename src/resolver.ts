import { RowDataPacket } from "mysql2";
import db from "../util/database";

export interface IJob {
  id: number;
  companyId: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface ICompany {
  id: number;
  name: string;
  description: string;
}

const resolvers = {
  Query: {
    getAllJobs: async () => {
      const [data, fields] = await db.execute<RowDataPacket[]>(
        "SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs"
      );
      return data;
    },
    getCompanyById: async (_root: any, { id }: { id: number }) => {
      const [data, fields] = await db.execute<RowDataPacket[]>(
        `SELECT * FROM companies WHERE id=${id}`
      );
      return data[0];
    },
    getJobById: async (_root: any, { id }: { id: number }) => {
      const [data, fields] = await db.execute<RowDataPacket[]>(
        `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${id}`
      );
      return data[0];
    },
  },

  Job: {
    company: async (job: IJob) => {
      const [data, fields] = await db.execute<RowDataPacket[]>(
        `SELECT * FROM companies WHERE id=${job.companyId}`
      );
      return data[0];
    },
  },
  Company: {
    jobs: async (company: ICompany) => {
      const [data, fields] = await db.execute<RowDataPacket[]>(
        `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE companyId=${company.id}`
      );
      return data;
    },
  },
};

export default resolvers;
