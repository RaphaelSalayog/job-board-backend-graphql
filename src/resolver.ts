import { RowDataPacket } from "mysql2";
import db from "../util/database";

export interface IJob {
  id: number;
  companyId: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface Company {
  id: number;
  name: string;
  description: string;
}

const resolvers = {
  Query: {
    jobs: async () => {
      const [data, fields] = await db.execute<RowDataPacket[]>(
        "SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs"
      );
      return data;
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
};

export default resolvers;
