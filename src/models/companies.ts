import { errorHandler } from "../../util/error";
import { ICompany } from "../interface/model";
import { getCompanyById_DbQuery } from "../../util/database/companyQueries";
import { getJobByCompanyId_DbQuery } from "../../util/database/jobQueries";

// Queries
const getCompanyById = async (_root: any, { id }: { id: number }) => {
  const [data, fields] = await getCompanyById_DbQuery(id);
  if (!data[0]) {
    throw errorHandler("No Company found with id " + id, "NOT_FOUND");
  }
  return data[0];
};

// Mutations

// Field Resolvers
const jobs = async (company: ICompany) => {
  const [data, fields] = await getJobByCompanyId_DbQuery(company.id);
  return data;
};

export { getCompanyById, jobs };
