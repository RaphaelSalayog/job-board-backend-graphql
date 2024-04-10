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
    company: company,
  },
  Company: {
    jobs: jobs,
  },
};

export default resolvers;
