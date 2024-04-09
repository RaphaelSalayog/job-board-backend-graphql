import { Request, Response, NextFunction } from "express";
import { RowDataPacket } from "mysql2";
import db from "../../util/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = 2;
  const { email, password } = req.body;

  try {
    const [data, fields] = await db.execute<RowDataPacket[]>(
      `SELECT id, companyId, email, password FROM users WHERE email="${email}"`
    );

    if (data[0]) {
      const error = new Error("Email already exist!");
      (error as any).statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await db.execute<RowDataPacket[]>(
      `INSERT INTO users (companyId, email, password) VALUES (?, ?, ?)`,
      [companyId, email, hashedPassword]
    );
    const [resultData] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM users WHERE email=?`,
      [email]
    );

    const token = jwt.sign(
      {
        userId: resultData[0].id,
        username: resultData[0].email,
      },
      "secrettoken",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Successfully logged in",
      token: token,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export { signup };
