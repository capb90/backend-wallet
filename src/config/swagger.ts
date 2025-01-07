import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('docs/openapi.yml');

export const setupSwagger = (app: Express) => {
  app.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
