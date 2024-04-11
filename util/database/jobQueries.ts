import db from "./connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getCurrentDateTime } from "../customMethods";
import { IAddJob, IUpdateJob } from "../../src/interface/model";

const getAllJobs_DbQuery = () => {
  return db.execute<RowDataPacket[]>(
    "SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs"
  );
};

const getJobById_DbQuery = (id: number, companyId?: number) => {
  return db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${id} ${
      companyId ? `AND companyId=${companyId}` : ""
    }`
  );
};

const getJobByCompanyId_DbQuery = (companyId: number) => {
  return db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE companyId=${companyId}`
  );
};

const addJob_DbQuery = ({ companyId, title, description }: IAddJob) => {
  return db.execute<ResultSetHeader>(
    `INSERT INTO jobs (companyId, title, description, createdAt) VALUES (${companyId}, "${title}", "${description}", "${getCurrentDateTime()}")`
  );
};

const updateJob_DbQuery = ({
  id,
  title,
  description,
  companyId,
}: IUpdateJob) => {
  return db.execute<ResultSetHeader>(
    `UPDATE jobs SET title="${title}", description="${description}" WHERE id=${id} AND companyId=${companyId}`
  );
};

const deleteJob_DbQuery = (id: number) => {
  return db.execute<RowDataPacket[]>(`DELETE FROM jobs WHERE id=${id}`);
};

export {
  getAllJobs_DbQuery,
  getJobById_DbQuery,
  getJobByCompanyId_DbQuery,
  addJob_DbQuery,
  updateJob_DbQuery,
  deleteJob_DbQuery,
};
