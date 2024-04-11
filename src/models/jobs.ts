import { errorHandler } from "../../util/error";
import { IJob, IUpdateJob, IUser } from "../interface/model";
import {
  addJob_DbQuery,
  deleteJob_DbQuery,
  getAllJobs_DbQuery,
  getJobById_DbQuery,
  updateJob_DbQuery,
} from "../../util/database/jobQueries";
import { getCompanyById_DbQuery } from "../../util/database/companyQueries";

// Queries
const getAllJobs = async () => {
  const [data, fields] = await getAllJobs_DbQuery();
  return data;
};

const getJobById = async (_root: any, { id }: { id: number }) => {
  const [data, fields] = await getJobById_DbQuery(id);
  return data[0];
};

// Mutations
const createJob = async (
  _root: any,
  {
    input: { title, description },
  }: { input: { title: string; description: string } },
  { user }: { user: IUser }
) => {
  if (!user) {
    throw errorHandler("Missing authentication", "NOT_FOUND");
  }
  const [data, fields] = await addJob_DbQuery({
    companyId: user.companyId,
    title,
    description,
  });
  const [resultData, resultFields] = await getJobById_DbQuery(data.insertId);

  return resultData[0];
};

const updateJob = async (
  _root: any,
  { input: { id, title, description } }: { input: IUpdateJob },
  { user }: { user: IUser }
) => {
  if (!user) {
    throw errorHandler("Missing authentication", "NOT_FOUND");
  }
  const [data, fields] = await getJobById_DbQuery(id, user.companyId);
  if (!data[0]) {
    throw errorHandler("No Job found with id " + id, "NOT_FOUND");
  }
  await updateJob_DbQuery({
    id,
    title,
    description,
    companyId: user.companyId,
  });
  return data[0];
};

const deleteJob = async (
  _root: any,
  { id }: { id: number },
  { user }: { user: IUser }
) => {
  if (!user) {
    throw errorHandler("Missing authentication", "NOT_FOUND");
  }
  const [data, fields] = await getJobById_DbQuery(id, user.companyId);
  if (!data[0]) {
    throw errorHandler("No Job found with id " + id, "NOT_FOUND");
  }
  await deleteJob_DbQuery(id);
  return data[0];
};

// Field Resolvers
const company = async (job: IJob) => {
  const [data, fields] = await getCompanyById_DbQuery(job.companyId);
  return data[0];
};

export { getAllJobs, getJobById, createJob, updateJob, company, deleteJob };
