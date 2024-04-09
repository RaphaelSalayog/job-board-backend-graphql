import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../util/database";
import { GraphQLError } from "graphql";

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
      if (!data[0]) {
        throw notFoundError("No Company found with id " + id, "NOT_FOUND");
      }
      return data[0];
    },
    getJobById: async (_root: any, { id }: { id: number }) => {
      const [data, fields] = await db.execute<RowDataPacket[]>(
        `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${id}`
      );
      return data[0];
    },
  },

  Mutation: {
    createJob: async (
      _root: any,
      {
        input: { title, description },
      }: { input: { title: string; description: string } }
    ) => {
      const companyId = 2;
      const [data, fields] = await db.execute<ResultSetHeader>(
        `INSERT INTO jobs (companyId, title, description, createdAt) VALUES (${companyId}, "${title}", "${description}", "${getCurrentDateTime()}")`
      );
      const [resultData, resultFields] = await db.execute<RowDataPacket[]>(
        `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${data.insertId}`
      );
      return resultData[0];
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

const notFoundError = (text: string, errorCode: string) => {
  return new GraphQLError(text, null, null, null, null, null, {
    extensions: {
      code: errorCode,
    },
  });
};

const getCurrentDateTime = () => {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
};

export default resolvers;
