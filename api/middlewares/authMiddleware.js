import { verifyToken, JWT_SECRET } from "../utils.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ msg: "Autenticação falhou: cabeçalho de autorização ausente" });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: "Autenticação falhou" });
  }
};
