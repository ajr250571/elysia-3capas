// utils/password.ts
import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
