// import { Request, Response } from "express";

// class EleveController{
//     static getAll = async(req: Request, res: Response) =>{
//         try{
//             const eleves = await Eleve.find();
//             return res.status(200).json({success: true, data: eleves});
//         }
//     }

//     static getOne = async(req: Request, res: Response) =>{
//         try{
//             const eleve = await Eleve.findById(req.params.id);
//             if(!eleve){
//                 throw new Error("Eleve not found");
//             }
//             return res.status(200).json({success: true, data: eleve});
//         }catch(error){
//             const [code, message] = error.message.split("|");
//             const isValid = isFinite(code);
//             return res.status(isValid? +code : 500).json({success: false, message: message || error.message});
//         }
//     }

//     static create = async(req: Request, res: Response) =>{
//         try{
//             const eleve = new Eleve(req.body);
//             await eleve.save();
//             return res.status(201).json({success: true, data: eleve});
//         }catch(error){
//             const [code, message] = error.message.split("|");
//             const isValid = isFinite(code);
//             return res.status(isValid? +code : 500).json({success: false, message: message || error.message});
//         }
//     }

//     static update = async(req: Request, res: Response) =>{
//         try{
//             const eleve = await Eleve.findByIdAndUpdate(req.params.id, req.body, {new: true});
//             if(!eleve){
//                 throw new Error("Eleve not found");
//             }
//             return res.status(200).json({success: true, data: eleve});
//         }catch(error){
//             const [code, message] = error.message.split("|");
//             const isValid = isFinite(code);
//             return res.status(isValid? +code : 500).json({success: false, message: message || error.message});
//         }
//     }

//     static delete = async(req: Request, res: Response) =>{
//         try{
//             await Eleve.findByIdAndDelete(req.params.id);
//             return res.status(200).json({success: true, message: "Eleve deleted"});
//         }catch(error){
//             const [code, message] = error.message.split("|");
//             const isValid = isFinite(code);
//             return res.status(isValid? +code : 500).json({success: false, message: message || error.message});
//         }
//     }

//     static getElevesByClasse = async(req: Request, res: Response) =>{
//         try{
//             const eleves = await Eleve.find({classe: req.params.classe});
//             return res.status(200).json({success: true, data: eleves});
//         }catch(error){
//             const [code, message] = error.message.split("|");
//             const isValid = isFinite(code);
//             return res.status(isValid? +code : 500).json({success: false, message: message || error.message});
//         }
//     }

//     static getElevesByNiveau = async(req: Request, res: Response) =>{
//         try{
//             const eleves = await Eleve.find({niveau: req.params.niveau});
//             return res.status(200).json({success: true, data: eleves});
//         }catch(error){
//             const [code, message] = error.message.split("|");
//             const isValid = isFinite(code);
//             return res.status(isValid? +code : 500).json({success: false, message: message || error.message});
//         }
//     }

//     static getElevesByMatiere = async(req: Request, res: Response) =>{
//         try{
//             const eleves = await Eleve.find({matiere: req.params.matiere});
//             return res.status(200).json({success: true, data: eleves});
//         }catch(error){
//             const [code, message] = error.message.split("|");
//             const isValid = isFinite(code);
//             return res.status(isValid? +code : 500).json({success: false, message: message || error.message});
//         }
//     }
// }
// export default EleveController