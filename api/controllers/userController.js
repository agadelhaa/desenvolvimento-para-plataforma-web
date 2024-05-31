import User from "../models/UserModel.js";
import {
  generateToken,
  handleServerError,
  comparePassword,
  hashPassword,
} from "../utils.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "erro no servidor" });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log("Received registration request:", req.body);

    const { firstName, lastName, email, password } = req.body;

    // Log each field to ensure they are received correctly
    console.log("Name:", firstName);
    console.log("LastName:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.log("Erro salvando o usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao registrar o usuário", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `Nenhum usuário com o id ${id}` });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: `nenhum usuário com o id ${id}` });
    }
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erro no servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const removedUser = await User.findByIdAndDelete(id);
    if (!removedUser) {
      return res.status(404).json({ msg: `nenhum usuário com o id ${id}` });
    }
    res.status(200).json({ user: removedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erro no servidor" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await comparePassword(req.body.password, user.password))) {
      return res.status(401).json({success: false, message: "Email ou senha inválido" });
    }
    const token = generateToken(user._id);
    res.status(200).json({success:true, message: "Login realizado com sucesso",token });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const logoutUSer = (req, res) => {
  //a lógica de deslogar ocorre no frontend
  res.status(200).json({ message: "Logout realizado com sucesso" });
};
