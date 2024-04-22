import db from "./connection";
import { RowDataPacket } from "mysql2";

const getUserByEmail_DbQuery = (email: string) => {
  console.log("getUserByEmail_DbQuery");
  return db.execute<RowDataPacket[]>(
    `SELECT id, companyId, email, password FROM users WHERE email=?`,
    [email]
  );
};

export { getUserByEmail_DbQuery };
