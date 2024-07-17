import { Request, Response } from "express";
import { Quartier } from "../entity/Quartier";
import { CreateQuartierDto } from "../dtos/create-quartier.dto";
import { Arrondissement } from "../entity/Arrondissement";

class QuartierController {
  static getAll = async (req: Request, res: Response) => {
    try {
        const quartiers = await Quartier.find();
        return res.status(200).json({ success: true, data: quartiers });
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
        const { nom, arrondissement_id } = req.body as CreateQuartierDto;
        const quartier = new Quartier();
        quartier.nom = nom;
        quartier.arrondissement_id = arrondissement_id
        await quartier.save();

      return res.status(201).json({
        success: true,
        data: quartier,
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
      const id = parseInt(req.params.id, 10); // Convertir l'ID en nombre
      const { nom, arrondissement_id } = req.body as CreateQuartierDto;

      let quartier = await Quartier.findOne({ where: { id } });

      if (!quartier) {
        return res
          .status(404)
          .json({ success: false, message: "Voiture non trouvée" });
      }

      quartier.nom = nom;
      quartier.arrondissement_id = arrondissement_id;
      await quartier.save();

      return res.status(200).json({
        success: true,
        data: quartier,
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
        const QuartierId = parseInt(req.params.id, 10); // Convertir l'ID en nombre
  
        const quartier = await Quartier.findOne({where: { id: QuartierId },
        });
  
        if (!quartier) {
          return res
            .status(404)
            .json({ success: false, message: "Quartier non trouvé" });
        }
  
        await Quartier.remove(quartier);
  
        return res.status(200).json({
          success: true,
          message: "Quartier supprimé avec succès",
        });
      } catch (error) {
        const [code, message] = error.message.split("|");
        const isValid = isFinite(code);
        return res
          .status(isValid ? +code : 500)
          .json({ success: false, message: message || error.message });
      }
    };
  };

export default QuartierController;