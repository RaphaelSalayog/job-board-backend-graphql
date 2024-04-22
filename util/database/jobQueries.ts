import db from "./connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getCurrentDateTime } from "../customMethods";
import { IAddJob, IUpdateJob } from "../../src/interface/model";

const getAllJobs_DbQuery = () => {
  console.log("getAllJobs_DbQuery");
  return db.execute<RowDataPacket[]>(
    "SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs"
  );
};

const getJobById_DbQuery = (id: number, companyId?: number) => {
  console.log("getJobById_DbQuery");
  return db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE id=${id} ${
      companyId ? `AND companyId=${companyId}` : ""
    }`
  );
};

const getJobByCompanyId_DbQuery = (companyId: number) => {
  console.log("getJobByCompanyId_DbQuery");
  return db.execute<RowDataPacket[]>(
    `SELECT id, companyId, title, description, DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt FROM jobs WHERE companyId=${companyId}`
  );
};

const addJob_DbQuery = ({ companyId, title, description }: IAddJob) => {
  console.log("addJob_DbQuery");
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
  console.log("updateJob_DbQuery");
  return db.execute<ResultSetHeader>(
    `UPDATE jobs SET title="${title}", description="${description}" WHERE id=${id} AND companyId=${companyId}`
  );
};

const deleteJob_DbQuery = (id: number) => {
  console.log("deleteJob_DbQuery");
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
