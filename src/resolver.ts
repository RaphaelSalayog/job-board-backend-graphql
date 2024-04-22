import {
  company,
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "./models/jobs";
import { getCompanyById, jobs } from "./models/companies";
import { login } from "./models/auth";
import { Context, IJob } from "./interface/model";

const resolvers = {
  Query: {
    getAllJobs: getAllJobs,
    getCompanyById: getCompanyById,
    getJobById: getJobById,
  },

  Mutation: {
    login: login,
    createJob: createJob,
    updateJob: updateJob,
    deleteJob: deleteJob,
  },

  Job: {
    company: (job: IJob, _args: any, { companyLoader }: Context) =>
      companyLoader?.load(job.companyId as any), // I use as any because it only accepts string
  },
  Company: {
    jobs: jobs,
  },
};

export default resolvers;
