import { Request, Response } from "express";
import User from '../Dto/UserDto';
import UserService from '../services/UserServices';
import { validarCorreo, validarContrasena, validarCamposObligatorios } from '../Helpers/validator';

let register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, lastName, phoneNumber } = req.body;

    
    if (!validarCamposObligatorios([email, password, name, lastName, phoneNumber])) {
      return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    if (!validarCorreo(email)) {
      return res.status(400).send({ error: 'Correo inválido' });
    }

    if (!validarContrasena(password)) {
      return res.status(400).send({ error: 'Contraseña no cumple con los requisitos' });
    }

    const registerUser = await UserService.register(new User(email, name, lastName, phoneNumber, password));
    return res.status(201).send({ status: 'register ok' });
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage });
    }
    return res.status(500).send({ error: 'Error interno del servidor' });
  }
}

export default register;
