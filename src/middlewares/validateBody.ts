import { RequestHandler } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

/**
 * Middleware de validation pour les données du corps de la requête.
 * @function
 * @param {ClassConstructor<any>} type - Constructeur de classe pour le DTO (Data Transfer Object).
 * @returns {RequestHandler} Middleware Express.
 */
export function validateBody(type: ClassConstructor<any>): RequestHandler {
  return (req, res, next) => {
    // Convertit le corps de la requête en instance du DTO
    const dtoObj = plainToInstance(type, req.body);

    // Valide l'instance du DTO avec les règles de validation
    validate(dtoObj, { skipMissingProperties: false, whitelist: true }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          // En cas d'erreurs de validation, renvoie une réponse JSON avec les détails des erreurs
          const dtoErrors = getErrorMessages(errors);
          res.status(422).json({
            success: false,
            message:
              'Les données fournies dans le corps de la requête ne sont pas valides. Veuillez réessayer.',
            errors: dtoErrors,
          });
        } else {
          // Si la validation réussit, met à jour le corps de la requête avec l'instance du DTO validée
          req.body = dtoObj;
          next();
        }
      }
    );
  };
}

/**
 * Récupère les messages d'erreur à partir des objets ValidationError.
 * @function
 * @param {ValidationError[]} errors - Tableau d'objets ValidationError.
 * @returns {string[]} Tableau de messages d'erreur.
 */
export function getErrorMessages(errors: ValidationError[]): string[] {
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