import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../util/database";
import { getCurrentDateTime } from "../../util/customMethods";
import { notFoundError } from "../../util/error";
import { IJob } from "../interface/model";
import { ExpressContext } from "apollo-server-express";

// Queries
const getAllJobs = async () => {
  const [data, fields] = await db.execute<RowDataPacket[]>(
    "SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs"
  );
  return data;
};

const getJobById = async (_root: any, { id }: { id: number }) => {
  const [data, fields] = await db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${id}`
  );
  return data[0];
};

// Mutations
const createJob = async (
  _root: any,
  {
    input: { title, description },
  }: { input: { title: string; description: string } },
  context: ExpressContext
) => {
  console.log(context);
  const companyId = 2;
  const [data, fields] = await db.execute<ResultSetHeader>(
    `INSERT INTO jobs (companyId, title, description, createdAt) VALUES (${companyId}, "${title}", "${description}", "${getCurrentDateTime()}")`
  );
  const [resultData, resultFields] = await db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${data.insertId}`
  );
  return resultData[0];
};

const updateJob = async (
  _root: any,
  {
    input: { id, title, description },
  }: { input: { id: number; title: string; description: string } }
) => {
  const [data, fields] = await db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${id}`
  );
  if (!data[0]) {
    throw notFoundError("No Job found with id " + id, "NOT_FOUND");
  }
  await db.execute<ResultSetHeader>(
    `UPDATE jobs SET title="${title}", description="${description}" WHERE id=${id}`
  );
  return data[0];
};

const deleteJob = async (_root: any, { id }: { id: number }) => {
  const [data, fields] = await db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${id}`
  );
  if (!data[0]) {
    throw notFoundError("No Job found with id " + id, "NOT_FOUND");
  }
  await db.execute<RowDataPacket[]>(`DELETE FROM jobs WHERE id=${id}`);
  return data[0];
};

// Field Resolvers
const company = async (job: IJob) => {
  const [data, fields] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM companies WHERE id=${job.companyId}`
  );
  return data[0];
};

export { getAllJobs, getJobById, createJob, updateJob, company, deleteJob };
