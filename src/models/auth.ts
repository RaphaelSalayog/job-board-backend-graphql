import { RowDataPacket } from "mysql2";
import db from "../../util/database/connection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (
  _root: any,
  { email, password }: { email: string; password: string }
) => {
  try {
    const [data, fields] = await db.execute<RowDataPacket[]>(
      `SELECT id, companyId, email, password FROM users WHERE email=?`,
      [email]
    );

    if (!data[0]) {
      console.log("error >");
    }

    const isEqual = await bcrypt.compare(password, data[0].password);
    if (!isEqual) {
      console.log("error >>");
    }

    const token = jwt.sign(
      {
        userId: data[0].id,
        username: data[0].email,
      },
      "secrettoken",
      { expiresIn: "24h" }
    );

    return { token: token };
  } catch (error: any) {
    console.log(error);
  }
};

export { login };
