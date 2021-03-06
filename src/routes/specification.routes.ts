import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecifications/CreateSpecificationController';

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);
