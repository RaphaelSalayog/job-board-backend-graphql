import db from "./connection";
import { RowDataPacket } from "mysql2";

const getCompanyById_DbQuery = (companyId: number) => {
  return db.execute<RowDataPacket[]>(
    `SELECT * FROM companies WHERE id=${companyId}`
  );
};

export { getCompanyById_DbQuery };
