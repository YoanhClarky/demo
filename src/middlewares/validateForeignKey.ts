import { RequestHandler } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { getConnection } from 'typeorm';
import { AppDataSource } from '../data-source';

// Fonction pour convertir les erreurs de validation en messages d'erreur
function getErrorMessages(errors: ValidationError[]): string[] {
  let messages: string[] = [];
  let queue: { error: ValidationError; path: string }[] = errors.map((error) => ({
    error,
    path: error.property,
  }));

  while (queue.length > 0) {
    const { error, path } = queue.shift();
    // Ajoute les messages d'erreur de la contrainte actuelle
    if (error.constraints) {
      const errorMessages = Object.values(error.constraints).map((message) => `${path} ${message}`);
      messages = [...messages, ...errorMessages];
    }
    // Ajoute les erreurs des enfants à la file d'attente
    if (error.children && error.children.length > 0) {
      const childrenErrors = error.children.map((childError) => ({
        error: childError,
        path: `${path}.${childError.property}`,
      }));
      queue = [...childrenErrors, ...queue];
    }
  }

  return messages;
}

// Middleware pour valider une clé étrangère dans une base de données
export function validateForeignKey(type: ClassConstructor<any>, foreignKeyName: string, nom_table: string): RequestHandler {
  return async (req, res, next) => {
    // Convertit le corps de la requête en instance du DTO
    const dtoObj = plainToInstance(type, req.body);

    // Valide l'instance du DTO avec les règles de validation
    validate(dtoObj, { skipMissingProperties: false, whitelist: true }).then(
      async (errors: ValidationError[]) => {
        if (errors.length > 0) {
          // En cas d'erreurs de validation, renvoie une réponse JSON avec les détails des erreurs
          const dtoErrors = getErrorMessages(errors);
          res.status(422).json({
            success: false,
            message: 'Les données fournies dans le corps de la requête ne sont pas valides. Veuillez réessayer.',
            errors: dtoErrors,
          });
        } else {
          // Si la validation réussit, vérifie la présence de la clé étrangère dans la base de données
          const connection = await AppDataSource.getRepository(type);
          const foreignKey = dtoObj[foreignKeyName];
          const foreignKeyExists = await connection.query(
            `SELECT * FROM ${nom_table} WHERE ${foreignKeyName} = ?`,
            [foreignKey]
          );

          if (foreignKeyExists.length === 0) {
            // Si la clé étrangère n'existe pas, renvoie une réponse JSON avec un message d'erreur
            res.status(400).json({
              success: false,
              message: `La clé étrangère ${foreignKeyName} n'existe pas dans la base de données.`,
            });
          } else {
            // Si la clé étrangère existe, met à jour le corps de la requête avec l'instance du DTO validée
            req.body = dtoObj;
            next();
          }
        }
      }
    );
  };
}