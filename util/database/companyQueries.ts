import db from "./connection";
import { RowDataPacket } from "mysql2";

const getCompanyById_DbQuery = (id: number) => {
  return db.execute<RowDataPacket[]>(`SELECT * FROM companies WHERE id=${id}`);
};

export { getCompanyById_DbQuery };
