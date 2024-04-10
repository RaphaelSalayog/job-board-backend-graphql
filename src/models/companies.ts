import { RowDataPacket } from "mysql2";
import db from "../../util/database";
import { errorHandler } from "../../util/error";
import { ICompany } from "../interface/model";

// Queries
const getCompanyById = async (_root: any, { id }: { id: number }) => {
  const [data, fields] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM companies WHERE id=${id}`
  );
  if (!data[0]) {
    throw errorHandler("No Company found with id " + id, "NOT_FOUND");
  }
  return data[0];
};

// Mutations

// Field Resolvers
const jobs = async (company: ICompany) => {
  const [data, fields] = await db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE companyId=${company.id}`
  );
  return data;
};

export { getCompanyById, jobs };
