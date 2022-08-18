import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { Types } from "mongoose";

function createToken(user: IUser) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.jwtSecret,
    {
      expiresIn: 86400, //1 día especificamos cuanto tiempo de duración tendra el token.
    }
  );
}
export const singUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //   console.log(req.body);

  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Por favor ingrese su Email y contraseña" });
  }
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ msg: "El Usuario ya Existe." });
  }
  const newUser = new User(req.body); //creamos la instancia para crear un nuevo usuario
  await newUser.save(); // guardamos el usuario en la DB.
  return res.status(201).json(newUser);
};

export const singIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Por favor ingrese su Email y contraseña" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json("Este usuario no existe.");
  }
  const isMatch = await user?.comparePassword(req.body.password); // comparamos la contraseña
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
  }
  return res.status(400).json("El correo o la contraseña son incorrectas");
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.deleteOne({
      _id: new Types.ObjectId("62fdc9da7e5a4f3a533adef1"),
    });
    res.send("User Deleted");
  } catch (error) {
    console.log(error);
    res.send(error);
    throw error;
  }
};
