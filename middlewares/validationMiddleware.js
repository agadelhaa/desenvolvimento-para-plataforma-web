import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("Não encontramos")) {
          return res.status(404).json({ msg: "Não encontrado" });
        }
        if (errorMessages[0].startsWith("Não autorizado")) {
          return res
            .status(401)
            .json({ msg: "Não autorizado a acessar esta rota" });
        }
        return res.status(400).json({ msg: errorMessages.join(", ") });
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("O nome precisa ser informado.")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("O nome precisa ter entre 3 e 30 caracteres"),
  body("lastName")
    .notEmpty()
    .withMessage("O sobrenome precisa ser informado")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("O sobrenome precisa ter entre 3 e 30 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("O email precisa ser informado.")
    .trim()
    .isEmail()
    .withMessage("Formato inválido de email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "O email já está cadastrado." });
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("A senha precisa ser informada.")
    .isLength({ min: 8 })
    .withMessage("A senha precisa ter pelo menos 8 caracteres")
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("O nome precisa ser informado.")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("O nome precisa ter entre 3 e 30 caracteres"),
  body("lastName")
    .notEmpty()
    .withMessage("O sobrenome precisa ser informado")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("O sobrenome precisa ter entre 3 e 30 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("O email precisa ser informado.")
    .trim()
    .isEmail()
    .withMessage("Formato inválido de email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "O email já está cadastrado." });
      }
    })
]);