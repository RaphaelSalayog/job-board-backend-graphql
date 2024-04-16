import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail_DbQuery } from "../../util/database/userQueries";
import { errorHandler } from "../../util/error";

const login = async (
  _root: any,
  { email, password }: { email: string; password: string }
) => {
  const [data, fields] = await getUserByEmail_DbQuery(email);

  if (!data[0]) {
    throw errorHandler("Email does not exist!", "NOT_FOUND");
  }

  const isEqual = await bcrypt.compare(password, data[0].password);
  if (!isEqual) {
    throw errorHandler("Invalid Password!", "INVALID_PASSWORD");
  }

  const token = jwt.sign(
    {
      userId: data[0].id,
      username: data[0].email,
    },
    "secrettoken",
    { expiresIn: "24h" }
  );

  return { token: token, username: data[0].email };
};

export { login };
