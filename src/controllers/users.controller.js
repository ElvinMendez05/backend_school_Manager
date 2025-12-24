// users.controller.js
import { UserModel } from '../models/user.model.js';

export const getUsers = async (req, res) => {
  const { rows } = await UserModel.findAll();
  res.json(rows);
};

export const deleteUser = async (req, res) => {
  await UserModel.deleteById(req.params.id);
  res.status(204).send();
};
