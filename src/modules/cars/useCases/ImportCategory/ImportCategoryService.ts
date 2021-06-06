import csvParse from "csv-parse";
import fs from "fs";

import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

export class ImportCategoryService {
    // eslint-disable-next-line prettier/prettier
    constructor(private categoriesRepository: ICategoryRepository) { }


    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse();
            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async ({ name, description }) => {
            const categoryExists = this.categoriesRepository.findByName(name);

            if (!categoryExists) {
                this.categoriesRepository.create({ name, description });
            }
        });
    }
}
