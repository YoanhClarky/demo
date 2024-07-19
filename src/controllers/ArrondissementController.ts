import { Request, Response } from "express";
import { Arrondissement } from "../entity/Arrondissement";
import { CreateArrondissementDto } from "../dtos/create-arrondissement.dto";
import { Ville } from "../entity/Ville";

class ArrondissementController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const arrondissements = await Arrondissement.find({relations :["ville"]});
      return res.status(200).json({ success: true, data: arrondissements });
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
        const { nom, ville_id } = req.body as CreateArrondissementDto;
        const arrondissement = new Arrondissement();
        arrondissement.nom = nom;
        arrondissement.ville_id = ville_id
        await arrondissement.save();

      return res.status(201).json({
        success: true,
        data: arrondissement,
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
    const { nom, ville_id } = req.body as CreateArrondissementDto;

    let arrondissement = await Arrondissement.findOne({ where: { id } });
    if (!arrondissement) {
      return res
        .status(404)
        .json({ success: false, message: "Arrondissement non trouvé" });
    }

    arrondissement.nom = nom;

    const ville = await Ville.findOne({ where: { id: ville_id } });
    if (ville) {
      arrondissement.ville = ville;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Ville non trouvée" });
    }

    await arrondissement.save();
    return res.status(200).json({
      success: true,
      data: arrondissement,
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
      const ArrondissementId = parseInt(req.params.id, 10); // Convertir l'ID en nombre

      const arrondissement = await Arrondissement.findOne({where: { id: ArrondissementId },
      });

      if (!arrondissement) {
        return res
          .status(404)
          .json({ success: false, message: "Arrondissement non trouvé" });
      }

      await Arrondissement.remove(arrondissement);

      return res.status(200).json({
        success: true,
        message: "Arrondissement supprimé avec succès",
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

export default ArrondissementController;