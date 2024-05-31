import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const JWT_SECRET = "este projeto vale nota 10"; 

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ msg: "erro no servidor" });
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (inputPassword, userPassword) => {
  return bcrypt.compare(inputPassword, userPassword);
};
