import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryService } from './ImportCategoryService';

export class ImportCategoryController {
  // eslint-disable-next-line prettier/prettier
  async handle(request: Request, response: Response): Promise<Response> {
    const importCategoryService = container.resolve(ImportCategoryService);

    const { file } = request;

    await importCategoryService.execute(file);

    return response.status(201).send();
  }
}
