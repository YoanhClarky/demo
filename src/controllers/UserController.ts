import { Request, Response } from "express";
import { User } from "../entity/User";
import { CreateUserDto } from "../dtos/create-user.dto";
import { AppDataSource } from "../data-source";
import { Quartier } from "../entity/Quartier";

class UserController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      return res.status(200).json({ success: true, data: users });
    } catch (error) {
      const [code, message] = error.message.split("|");
      const isValid = isFinite(code);
      return res
        .status(isValid ? +code : 500)
        .json({ success: false, message: message || error.message });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
        const { nom, prenom, age, quartier_id } = req.body as CreateUserDto;
        const user = new User();
        user.nom = nom;
        user.prenom = prenom;
        user.age = age;
        user.quartier_id = quartier_id
        await user.save();

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      const [code, message] = error.message.split("|");
      const isValid = isFinite(code);
      return res
        .status(isValid ? +code : 500)
        .json({ success: false, message: message || error.message });
    }
  };


 static update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10); // Convert the ID to a number
    const { nom, prenom, age, quartier_id } = req.body as CreateUserDto;

    let user = await User.findOne({ where: { id } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User non trouvé" });
    }

    user.nom = nom;
    user.prenom = prenom;
    user.age = age;

    // Update the quartier property based on the quartier_id
    const quartier = await Quartier.findOne({ where: { id: quartier_id } });
    if (quartier) {
      user.quartier = quartier;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Quartier non trouvé" });
    }

    await user.save();
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    const [code, message] = error.message.split("|");
    const isValid = isFinite(code);
    return res
      .status(isValid ? +code : 500)
      .json({ success: false, message: message || error.message });
  }
};

  static delete = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10); // Convertir l'ID en nombre

      const user = await AppDataSource.manager.findOne(User, {
        where: { id: userId },
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur non trouvé" });
      }

      await AppDataSource.manager.remove(User, user);

      return res.status(200).json({
        success: true,
        message: "Utilisateur supprimé avec succès",
      });
    } catch (error) {
      const [code, message] = error.message.split("|");
      const isValid = isFinite(code);
      return res
        .status(isValid ? +code : 500)
        .json({ success: false, message: message || error.message });
    }
  };
}

export default UserController;