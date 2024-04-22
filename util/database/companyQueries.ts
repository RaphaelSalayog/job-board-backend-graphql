import db from "./connection";
import { RowDataPacket } from "mysql2";
import DataLoader from "dataloader";

const getCompanyById_DbQuery = (id: number) => {
  console.log("getCompanyById_DbQuery");
  return db.execute<RowDataPacket[]>(`SELECT * FROM companies WHERE id=${id}`);
};

// DataLoader (package)
// It reduce the query execution (you can check it in GraphQL by Example, Section 10: Data Loaders)
// It's same as JOIN in SQL but you can use it in any database like MongoDB
const batchCompanyLoaderFn: DataLoader.BatchLoadFn<string, any> = async (
  ids
) => {
  const companies = await db.execute<RowDataPacket[]>(
    `SELECT * FROM companies WHERE id IN (${ids})`
  );

  // IMPORTANT : you need to return the data in the same order as the 'ids' that's why we use map and find function
  /* Example : if the ids are [1,2,3], you need to return the data as 
               [
                  {id: 1, name: 'Rap'}, 
                  {id: 2, name: 'Char'}, 
                  {id: 3, name: 'Kim'}
                ] 
  */
  return ids.map((id) => companies[0].find((company) => company.id === id));
};

const companyLoader = new DataLoader(batchCompanyLoaderFn);

export { getCompanyById_DbQuery, companyLoader };
