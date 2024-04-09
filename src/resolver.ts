import {
  company,
  createJob,
  deleteJob,
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
