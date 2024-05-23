import User from "../models/UserModel.js";

import { nanoid } from "nanoid";

let users = [
  { id: nanoid(), name: "Amanda", condition: "acompanhando a leitura" },
  { id: nanoid(), name: "Rafael", condition: "acompanhando a leitura" },
  {
    id: nanoid(),
    name: "Klaus",
    condition: "não estou acompanhando a leitura",
  },
];

export const getAllUsers = async (req, res) => {
  res.status(200).json({ users });
};

export const createUser = async (req, res) => {
  const user = await User.create(req.body)

  res.status(201).json({ user });
}

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ msg: `nenhum usuário com o id ${id}` });
  }
  res.status(200).json({ user });
};

export const updateUser = async (req, res) => {
  const { name, condition } = req.body;
  if (!name || !condition) {
    return res.status(400).json({ msg: "por favor preencha nome e status" });
  }
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ msg: `nenhum usuário com o id ${id}` });
  }
  user.name = name;
  user.condition = condition;

  res.status(200).json({ msg: "usuário editado", user });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ msg: `nenhum usuário com o id ${id}` });
  }
  const newUsers = users.filter((user) => user.id !== id);
  users = newUsers;
  res.status(200).json({ msg: "usuário deletado" });
};