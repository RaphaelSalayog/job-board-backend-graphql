import {
  company,
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "./models/jobs";
import { getCompanyById, jobs } from "./models/companies";

const resolvers = {
  Query: {
    getAllJobs: getAllJobs,
    getCompanyById: getCompanyById,
    getJobById: getJobById,
  },

  Mutation: {
    createJob: createJob,
    updateJob: updateJob,
  },

  Job: {
    company: company,
  },
  Company: {
    jobs: jobs,
  },
};

export default resolvers;
