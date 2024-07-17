import { Request, Response } from "express";
import { Ville } from "../entity/Ville";
import { CreateVilleDto } from "../dtos/create-ville.dto";

class VilleController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const villes = await Ville.find();
      return res.status(200).json({ success: true, data: villes });
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
        const { nom } = req.body as CreateVilleDto;
        const ville = new Ville();
        ville.nom = nom;
        await ville.save();

      return res.status(201).json({
        success: true,
        data: ville,
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
    const { nom } = req.body as CreateVilleDto;

    let _ville = await Ville.findOne({ where: { id } });
    if (!_ville) {
      return res
        .status(404)
        .json({ success: false, message: "Ville non trouvée" });
    }

    _ville.nom = nom;

    await _ville.save();
    return res.status(200).json({
      success: true,
      data: _ville,
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
      const VilleId = parseInt(req.params.id, 10); // Convertir l'ID en nombre

      const ville = await Ville.findOne({where: { id: VilleId },
      });

      if (!ville) {
        return res
          .status(404)
          .json({ success: false, message: "Ville non trouvée" });
      }

      await Ville.remove(ville);

      return res.status(200).json({
        success: true,
        message: "Ville supprimée avec succès",
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

export default VilleController;